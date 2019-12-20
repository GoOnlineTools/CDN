import {colors, customCode, general, menus, seo} from "../../admin/appearance/config";
import {AppearanceFieldConfig} from "./vebto-config";

export const DEFAULT_VEBTO_ADMIN_CONFIG = {
    admin: {
        pages: [],
        appearance: {
            defaultRoute: '/',
            navigationRoutes: [
                'account/settings',
                'admin',
            ],
            menus: {
                availableRoutes: [
                    'login',
                    'register',
                    'account-settings',
                    'admin/appearance',
                    'admin/users',
                    'admin/settings/authentication',
                    'admin/settings/branding',
                    'admin/settings/cache',
                    'admin/settings/providers',
                    'admin/groups',
                ],
            },
            fields: <{[key: string]: AppearanceFieldConfig}> {
                general,
                menus,
                colors,
                customCode,
                seo,
            }
        }
    }
};