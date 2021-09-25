const stdlib = require("@grakkit/stdlib-paper");
require("@grakkit/js");
const { type, load } = require("@grakkit/stdlib-paper");
const ItemStack = type("org.bukkit.inventory.ItemStack");
const Material = type("org.bukkit.Material");
const Action = type("org.bukkit.event.block.Action");
const BukkitAdapter = type("com.sk89q.worldedit.bukkit.BukkitAdapter");

const WorldGuard = load(
  "plugins/worldguard-bukkit-7.0.6-beta1-dist.jar",
  "com.sk89q.worldguard.WorldGuard"
);

class Mirror {
  constructor(clazz) {
    /** @type {import('@grakkit/types-paper').jlClass} */
    this.class = clazz;
  }
  /** @param {string} name @param {any[]} args */
  invokeMethod(name, ...args) {
    const method = this.class.getDeclaredMethod(name);
    method.setAccessible(true);
    return method.invoke(this.class, ...args);
  }
}

const instance = new Mirror(WorldGuard)
  .invokeMethod("getInstance")
  .getPlatform();

/** @type {import('@grakkit/types-paper').obLocation} */
function locationRegions(location) {
  return instance
    .getRegionContainer()
    .createQuery()
    .getApplicableRegions(BukkitAdapter.adapt(location));
}
require('./adminCommands.js');
require('./spawnCanal.js');




