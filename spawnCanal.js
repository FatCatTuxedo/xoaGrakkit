stdlib.event("org.bukkit.event.block.BlockDispenseEvent", (event) => {
    const block = event.getBlock();
    if (
      [...locationRegions(block.getLocation()).getRegions()]
        .toString()
        .includes("spawncanal")
    ) {
      setTimeout(() => {
        block
          .getState()
          .getInventory()
          .addItem(new ItemStack(Material.ACACIA_BOAT));
        block.getState().update();
      }, 5);
    }
  });
  
  stdlib.event(
    "org.bukkit.event.player.PlayerInteractEvent",
    (event) => {
       const action = event.getAction();
       const clickedBlock = event.getClickedBlock();
       const player = event.getPlayer();
      if (action === Action.RIGHT_CLICK_BLOCK) {
        if (
          [...locationRegions(clickedBlock.getLocation()).getRegions()]
            .toString()
            .includes("spawncanal") &&
          clickedBlock.getType() === Material.POLISHED_BLACKSTONE_BUTTON
        ) {
           if (player.hasPermission("xoa.boatspawner.cooldown"))
           {
              player.sendMessage("§7[§fXoa§cSpawn§7] §fYou have already spawned a boat recently!");
              event.setCancelled(true);
           }
           else
           {
              server.dispatchCommand(server.getConsoleSender(), "lp user " + player.getName() + " permission settemp xoa.boatspawner.cooldown true 10m")
           }
        }
      }
    }
  );