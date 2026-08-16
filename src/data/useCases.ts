import type { UseCase } from "./types";

/**
 * Use cases registry. Populated in later phases with concrete scenarios
 * (e.g. "a bank files returns to a central bank", "a corporate files GST
 * returns"). Left empty in the scaffolding phase.
 */
export const useCases: UseCase[] = [];
