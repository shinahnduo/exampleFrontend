// 환경 변수와 관련된 유틸리티 함수

export const getEnv = () => ({
  VITE_APP_TITLE: process.env.VUE_APP_TITLE || 'Default Title',
  VITE_PROJECT_EMPTY: process.env.VUE_APP_PROJECT_EMPTY || 'empty',
  VITE_LOCAL_STORAGE: process.env.VUE_APP_LOCAL_STORAGE || 'local_storage',
  VITE_EMPTY_LINE: process.env.VUE_APP_EMPTY_LINE || 'empty_line',
  VITE_LINE_BREAK: process.env.VUE_APP_LINE_BREAK || 'line_break',
  VITE_PAGE_BREAK: process.env.VUE_APP_PAGE_BREAK || 'page_break',
  VITE_INITIAL_LOAD: process.env.VUE_APP_INITIAL_LOAD || 'initial_load',
  VITE_BASE_URL: process.env.VUE_APP_BASE_URL || 'http://localhost:8080',
  VITE_GOOGLE_FONTS_KEY: process.env.VUE_APP_GOOGLE_FONTS_KEY || '',
  VITE_GOOGLE_FONTS_MAX_FONTS: process.env.VUE_APP_GOOGLE_FONTS_MAX_FONTS || 100,
  VITE_DROPBOX_APP_KEY: process.env.VUE_APP_DROPBOX_APP_KEY || '',
  VITE_SUPABASE_URL: process.env.VUE_APP_SUPABASE_URL || '',
  VITE_SUPABASE_ANON_KEY: process.env.VUE_APP_SUPABASE_ANON_KEY || '',
  VITE_SENTRY_DSN: process.env.VUE_APP_SENTRY_DSN || '',
  VITE_BEGINEER_LIMIT: process.env.VUE_APP_BEGINEER_LIMIT || 1000,
  VITE_INTERMEDIATE_LIMIT: process.env.VUE_APP_INTERMEDIATE_LIMIT || 5000,
  VITE_ADVANCED_LIMIT: process.env.VUE_APP_ADVANCED_LIMIT || 10000,
  VITE_CUSTOM_LIMIT: process.env.VUE_APP_CUSTOM_LIMIT || 2000,
  VITE_UNLIMITED_LIMIT: process.env.VUE_APP_UNLIMITED_LIMIT || 999999,
  VITE_LIVEBLOCKS_PUBLIC: process.env.VUE_APP_LIVEBLOCKS_PUBLIC || '',
  VITE_LIVEBLOCKS_SECRET: process.env.VUE_APP_LIVEBLOCKS_SECRET || '',
  VITE_GROK_API_KEY: process.env.VUE_APP_GROK_API_KEY || ''
});
  
  // Vue 컴포넌트에서 사용할 수 있도록 export
  export const useEnv = () => {
    const env = getEnv();
  
    const getSentryDsn = () => env.VITE_SENTRY_DSN;
    const getProdUrl = () => env.VITE_BASE_URL;
    const getCorrectLocalUrl = () =>
      import.meta.env.PROD ? getProdUrl() : "http://localhost:3000";
    const projectEmpty = () => env.VITE_PROJECT_EMPTY;
    const dropboxKey = () => env.VITE_DROPBOX_APP_KEY;
    const projectLocalStorage = () => env.VITE_LOCAL_STORAGE;
    const storageLimitSaver = () => "__BW_LIMIT_SAVER__";
    const isEmptyProject = (name) => name === projectEmpty();
    const googleMaxFonts = () => env.VITE_GOOGLE_FONTS_MAX_FONTS;
    const googleFontsKey = () => env.VITE_GOOGLE_FONTS_KEY;
    const production = () => import.meta.env.MODE === "production";
    const emptyLine = () => env.VITE_EMPTY_LINE;
    const lineBreak = () => env.VITE_LINE_BREAK;
    const pageBreak = () => env.VITE_PAGE_BREAK;
    const initialLoad = () => env.VITE_INITIAL_LOAD;
    const packageVersion = () => import.meta.env.PACKAGE_VERSION;
    const isDev = () => import.meta.env.DEV;
    const grokApiKey = () => env.VITE_GROK_API_KEY;
  
    const getAccountPlanLimit = (plan) => {
      switch (plan) {
        case "beginner":
          return env.VITE_BEGINEER_LIMIT;
        case "intermediate":
          return env.VITE_INTERMEDIATE_LIMIT;
        case "advanced":
          return env.VITE_ADVANCED_LIMIT;
        case "unlimited":
          return env.VITE_UNLIMITED_LIMIT;
        default:
          return null;
      }
    };
  
    return {
      projectEmpty,
      projectLocalStorage,
      isEmptyProject,
      googleMaxFonts,
      googleFontsKey,
      production,
      getSentryDsn,
      getProdUrl,
      dropboxKey,
      getCorrectLocalUrl,
      storageLimitSaver,
      emptyLine,
      lineBreak,
      pageBreak,
      initialLoad,
      packageVersion,
      isDev,
      getAccountPlanLimit,
      grokApiKey,
    };
  };