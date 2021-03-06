import store from "store2";

const settings = store.namespace("settings");

export default {
  get onlyShowStarred(): boolean {
    const value = settings.get("onlyShowStarred");
    return value || false;
  },

  set onlyShowStarred(value: boolean) {
    settings.set("onlyShowStarred", value);
  },

  get filters(): string[] {
    const value = settings.get("filters");
    return value || [];
  },

  set filters(value: string[]) {
    settings.set("filters", value);
  },
};
