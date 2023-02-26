/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import { AstroGlobal } from "astro"

declare global {
	var Astro: AstroGlobal
}
