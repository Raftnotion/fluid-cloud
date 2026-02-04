/**
 * Script Filter Utility
 * 
 * Check if a script should load on current page
 */

import { ScriptConfig } from './index';

/**
 * Check if script should load based on current path
 * 
 * @param config - Script configuration
 * @param pathname - Current page path (from usePathname())
 * @returns true if script should load
 * 
 * Logic:
 * 1. If script not enabled → return false
 * 2. If excludePages has current path → return false
 * 3. If includePages is set and doesn't have current path → return false
 * 4. Otherwise → return true
 */
export function shouldLoadScript(
    config: ScriptConfig | undefined,
    pathname: string
): boolean {
    // No config or not enabled
    if (!config || !config.enabled) {
        return false;
    }

    // Check excludePages - if current path is excluded, don't load
    if (config.excludePages && config.excludePages.length > 0) {
        const isExcluded = config.excludePages.some(page =>
            pathname === page || pathname.startsWith(page + '/')
        );
        if (isExcluded) {
            return false;
        }
    }

    // Check includePages - if set, only load on those pages
    if (config.includePages && config.includePages.length > 0) {
        const isIncluded = config.includePages.some(page =>
            pathname === page || pathname.startsWith(page + '/')
        );
        if (!isIncluded) {
            return false;
        }
    }

    // All checks passed, load the script
    return true;
}
