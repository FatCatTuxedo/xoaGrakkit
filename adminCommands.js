stdlib.command({
    name: "setlevel",
    // permission required
    permission: "xoa.admin",
    // error that displays if you don't have permissions
    error: "§c>:(",
    execute: (player, target, level) => {
      if (target) {
        target = server.getPlayer(target);
        if (target) {
          target.sendMessage("Your level has been updated!");
          target.setLevel(parseInt(level));
          player.sendMessage("§6Your targets level has been set.");
        } else {
          player.sendMessage("§cThat player is offline or does not exist!");
        }
      } else {
        player.sendMessage("§cUsage: /setlevel <target> <level>");
      }
    },
    tabComplete: (player, ...args) => {
      if (args.length < 2) {
        const players = [...server.getOnlinePlayers()].map((player) =>
          player.getName()
        );
        return players.filter((name) => name.includes(args[0]));
      }
    },
  });