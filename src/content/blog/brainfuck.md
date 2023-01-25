---
title: Build a brainfuck interpreter in Rust
date: 01/24/23
description: How I built a Brainfuck interpreter in Rust.
tags:
    - rust
    - interpreter
---

When I got the idea of learning and writing interpreters is when I accidentally watched [the video](https://www.youtube.com/watch?v=hdHjjBS4cs8) from Fireship talking about a language called Brainf\*\*k. I highly recommend you to learn more about that! [This article](https://gist.github.com/roachhd/dce54bec8ba55fb17d3a) is also nice. It's just so fun...

Also, I just started learning and writing Rust and was about and wanting to do something about making my own language (I tried that before, but obviously I didn't have the ability, experiences or time or energy to do so). Then I came up with the idea of writing a Rust version of Brainfuck interpreter to improve and enhance my Rust skills and start to work on things related to interpreters and compilers. Let's get started.

## Starting point

I first initialized a Rust project using Cargo (it's in the `brainfuck` directory at the root of the repo). The CLI interpreter program needs an entry point, which receives some args from the user. I chose the library [Clap](https://docs.rs/clap/4.0.32/clap/) to do so. Add this to the dependencies part of the Cargo.toml:

```toml
clap = { version = "4.0.32", features = ["derive", "cargo"] }
```

Here's the main function of the program (The code is at [`/brainfuck/src/main.rs`](https://github.com/zihan-ch/lang-journey/blob/main/brainfuck/src/main.rs)):

```rust
use clap::{arg, command};
use std::fs;

fn main() {
    let matches = command!()
        .arg(arg!(<file> "The brainfuck file (*.bf) that you want to run"))
        .arg(arg!(
        -d --debug "Set debug mode"
        ))
        .arg(arg!(
        -i --interval <VALUE> "The duration the program stops for debugging (milliseconds) (default 30)"
        ))
        .get_matches();

    let debug = {
        match matches.get_one::<bool>("debug") {
            Some(d) => *d,
            None => false,
        }
    };

    if debug {
        println!("The debug format is: <current_operation> <pointer_position> <the_array> (The current position starts from 0)")
    }

    let interval: u32 = {
        match matches.get_one::<String>("interval") {
            Some(d) => match d.parse() {
                Ok(i) => i,
                Err(_err) => 30,
            },
            None => 30,
        }
    };

    let filepath = matches
        .get_one::<String>("file")
        .expect("No file specified");

    // Read the content from the file
    let content = fs::read_to_string(filepath).expect("Unable to read that file");

    // Run the code!
    run::exe(content, debug, interval);
    println!(""); // Don't mind this
}
```

I guess the code is easy to read hopefully (if you know some basic Rust). As you can see above, the program also have a debug mode which you can turn on by adding `-d` or `--debug`. Also, you can specify the duration that the program sleeps for debuging easier (which is 30 by default). The code can't run yet with the `run::exe(content, debug, interval);` because we haven't implement the interpreter yet. However, the program's gonna run as usual without that line.

## Interpreter implementation

Let's first look at what I passed into the `run::exe`: content, debug and interval. That's all we got from the input. Now let's implement the interpreter.

```rust
pub mod run {
    use std::io::{stdin, Read};

    pub enum Operator {
        Left,
        Right,
        Add,
        Minus,
        Out,
        In,
        Start,
        End,
    }

    pub fn get_operator_from_char(char: char) -> Option<Operator> {
        if char == '<' {
            Some(Operator::Left)
        } else if char == '>' {
            Some(Operator::Right)
        } else if char == '+' {
            Some(Operator::Add)
        } else if char == '-' {
            Some(Operator::Minus)
        } else if char == '.' {
            Some(Operator::Out)
        } else if char == ',' {
            Some(Operator::In)
        } else if char == '[' {
            Some(Operator::Start)
        } else if char == ']' {
            Some(Operator::End)
        } else {
            None
        }
    }

    pub fn exe(content: String, debug: bool, interval: u32) {
        let mut arr: Vec<i16> = vec![0; 10000];
        let mut pos = 0;
        // The loop stack contains the starting point of the loops
        let mut loop_stack: Vec<usize> = vec![];

        let mut max_pos = 0;
        let update_max_pos = |max_pos: &mut usize, pos: &usize| {
            if debug {
                if *max_pos < *pos {
                    *max_pos = pos.clone();
                }
            }
        };
        let mut output = "".to_string();

        let mut char_pos = 0;
        let chars = content.chars();
        let total = content.len();

        loop {
            match chars.clone().nth(char_pos) {
                Some(char) => {
                    let operator = get_operator_from_char(char);
                    match operator {
                        Some(operator) => {
                            if debug {
                                std::thread::sleep(std::time::Duration::from_millis(
                                    interval.into(),
                                ));
                                println!("{} {} {:?}", char, pos, &arr[0..max_pos + 1]);
                            }

                            match operator {
                                Operator::Add => {
                                    arr[pos] += 1;
                                }
                                Operator::Minus => {
                                    arr[pos] -= 1;
                                }
                                Operator::Out => {
                                    let character = char::from_u32(match arr[pos].try_into() {
                                        Ok(n) => n,
                                        Err(_err) => {
                                            break;
                                        }
                                    })
                                    .unwrap();

                                    if debug {
                                        output.push(character);
                                        println!("************* Output: {} **************", output);
                                    } else {
                                        print!("{}", character);
                                    }
                                }
                                Operator::In => {
                                    let mut input = [0; 1];
                                    let result = stdin().read(&mut input);
                                    match result {
                                        Ok(_data) => {
                                            arr[pos] = (*input.get(0).unwrap()).into();
                                        }
                                        Err(_err) => {
                                            println!("Input not legal!");
                                            break;
                                        }
                                    }
                                }
                                Operator::Right => {
                                    pos += 1;
                                    update_max_pos(&mut max_pos, &pos);
                                }
                                Operator::Left => {
                                    pos -= 1;
                                    update_max_pos(&mut max_pos, &pos);
                                }
                                Operator::Start => {
                                    loop_stack.push(char_pos);
                                }
                                Operator::End => {
                                    if arr[pos] == 0 {
                                        loop_stack.pop();
                                    } else {
                                        char_pos = *loop_stack.last().unwrap();
                                    }
                                }
                            }
                        }
                        None => {}
                    }
                }
                None => break,
            }

            char_pos += 1;

            if char_pos == total {
                break;
            }
        }
    }
}
```

That's all! If you put that into the main.rs, the program's gonna run successfully and correctly now. Let's go through the code.

```rust
pub enum Operator {
    Left,
    Right,
    Add,
    Minus,
    Out,
    In,
    Start,
    End,
}

pub fn get_operator_from_char(char: char) -> Option<Operator> {
    if char == '<' {
        Some(Operator::Left)
    } else if char == '>' {
        Some(Operator::Right)
    } else if char == '+' {
        Some(Operator::Add)
    } else if char == '-' {
        Some(Operator::Minus)
    } else if char == '.' {
        Some(Operator::Out)
    } else if char == ',' {
        Some(Operator::In)
    } else if char == '[' {
        Some(Operator::Start)
    } else if char == ']' {
        Some(Operator::End)
    } else {
        None
    }
}
```

This is the operator part. There are only eight operators in Brainfuck (you can reference to [Wikipedia](https://en.wikipedia.org/wiki/Brainfuck)), which are listed above (I assume that you understand how Brainfuck works, if not, watch the YouTube video I showed you above). They are:

1. Move the pointer: Operator::Right, Operator::Left
2. Increase or decrease the number inside the current cell: Operator::Add, Operator::Minus
3. Input or output: Operator::In, Operator::Output
4. Loop start or end: Operator::Start, Operator::end

The get_operator_from_char function transforms a character into the corresponding Operator, if the character passed in is not a legal operator, it will return None.

Now it's the initialization part of the exe function (which we called in the main function with `exe::run`):

```rust
pub fn exe(content: String, debug: bool, interval: u32) {
    let mut arr: Vec<i16> = vec![0; 10000];
    let mut pos = 0;
    // The loop stack contains the starting point of the loops
    let mut loop_stack: Vec<usize> = vec![];

    let mut max_pos = 0;
    let update_max_pos = |max_pos: &mut usize, pos: &usize| {
        if debug {
            if *max_pos < *pos {
                *max_pos = pos.clone();
            }
        }
    };
    let mut output = "".to_string();

    let mut char_pos = 0;
    let chars = content.chars();
    let total = content.len();
```

The `arr` is the main array with cells that can be operated. I didn't make it as long as the standard Brainfuck species because it's just not neccesary. The `pos` is the pointer's position. I will explain the loop stack later.

The max_pos, update_max_pos and output variables are just made for debugging. `max_pos` makes sure that we won't print out the whole 10000-long array, but only the cells used. The output variable makes sure the outputs are recorded.

`char_pos`, `chars` and `total` are for visiting every character in the content.

```rust
loop {
    match chars.clone().nth(char_pos) {
        Some(char) => {
            let operator = get_operator_from_char(char);
            match operator {
                Some(operator) => {
                    if debug {
                        std::thread::sleep(std::time::Duration::from_millis(
                            interval.into(),
                        ));
                        println!("{} {} {:?}", char, pos, &arr[0..max_pos + 1]);
                    }

                    // TODO: operate the operator
                }
                None => {}
            }
        }
        None => break,
    }

    char_pos += 1;

    if char_pos == total {
        break;
    }
}
```

This is the main loop that process every character in the Brainfuck code. I cloned the chars every time because the `nth` function is removing that item from the `chars` iterator and I don't have a better way to do so (just too lazy). Note thtat if it's in debug mode, the program will sleep for a while (which is the interval param) and print out the operator, the pointer position and the array. Also note that we used the function `get_operator_from_char` which we defined above.

```rust
match operator {
    Operator::Add => {
        arr[pos] += 1;
    }
    Operator::Minus => {
        arr[pos] -= 1;
    }
    Operator::Out => {
        let character = char::from_u32(match arr[pos].try_into() {
            Ok(n) => n,
            Err(_err) => {
                break;
            }
        })
        .unwrap();

        if debug {
            output.push(character);
            println!("************* Output: {} **************", output);
        } else {
            print!("{}", character);
        }
    }
    Operator::In => {
        let mut input = [0; 1];
        let result = stdin().read(&mut input);
        match result {
            Ok(_data) => {
                arr[pos] = (*input.get(0).unwrap()).into();
            }
            Err(_err) => {
                println!("Input not legal!");
                break;
            }
        }
    }
    Operator::Right => {
        pos += 1;
        update_max_pos(&mut max_pos, &pos);
    }
    Operator::Left => {
        pos -= 1;
        update_max_pos(&mut max_pos, &pos);
    }
    Operator::Start => {
        loop_stack.push(char_pos);
    }
    Operator::End => {
        if arr[pos] == 0 {
            loop_stack.pop();
        } else {
            char_pos = *loop_stack.last().unwrap();
        }
    }
}
```

Here we dealed with the operator. Hopefully the code is easy to understand.

Now let me explain how the loop stack works. First we defined an array that records all the starting position of the loops:

```rust
// The loop stack contains the starting point of the loops
let mut loop_stack: Vec<usize> = vec![];
```

Then when a loop starts, we will put the starting position of the loop into the loop stack:

```rust
Operator::Start => {
    loop_stack.push(char_pos);
}
```

Also when the loop is end, we will detect if the current cell is zero or not. If the current cell is zero, we will remove the last item in the loop stack and then continue the program. If not, we will go back to the starting point of the loop and re-run the whole loop.

```rust
Operator::End => {
    if arr[pos] == 0 {
        loop_stack.pop();
    } else {
        char_pos = *loop_stack.last().unwrap();
    }
}
```

This enables nested loops.

## Conclusion

That's all! I wrote 184 lines of Rust code in total and practised a lot about both Rust and interpreters. BTW, Here's the Brainfuck code that outputs `Hello, I'm Zihan!`:

```
H: >+++++[<++++++++++++++>-]<++.
e: >>++++[>+++++<-]>[<+++++>-]<+.
l: +++++++.
l: .
o: +++.
comma: <<++>+++++[<------>-]<.
space: >+++[<---->-]<.

clear: [-]>>[-]<<

I: >++++++++[<+++++++++>-]<+.
': >>>+++++[<++++++++>-]<-.
m: >+++++[<++++++++++++++>-]<.
space: [-]>++++[<++++++++>-]<.

clear: [-]<<[-]

Z: >++++++++++[<+++++++++>-]<.
i: >>++++[>+++++<-]>+[<+++++>-]<.
h: -.
a: <<+++++++.
n: >>++++++.
!: [-]>++++[<++++++++>-]<+.

clear in the end: [-]<<[-]
```

You can also put this into [the online Brainfuck emulator](https://copy.sh/brainfuck/) and try to run that. It took me really a long time to write all of this.

I'm not writing any kind of guidance to write a Brainfuck emulator, but just for fun and learning. Please don't mind if I'm casual writing this "article". Anyway, it's just a record of my learning journey. Hope you enjoy it. Thanks.
