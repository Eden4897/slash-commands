import { AutocompleteInteraction } from "discord.js";
import { commands } from "../builder";

export async function handleAutocomplete(interaction: AutocompleteInteraction) {
  const command = commands.get(interaction.commandName);

  // If command not found
  if (!commands.get(interaction.commandName)) throw new Error(`Cannot find the ${interaction.commandName} command but got an autocomplete request.`);

  if (command.autocompleter)
    return await interaction.respond(
      (await command.autocompleter(interaction)).map(choice => ({ name: choice, value: choice })),
    );

  // If it is a subcommand
  const subcommandName = interaction.options.getSubcommand();
  if (subcommandName) {
    const subcommand = command.subcommands.find(subcommand => subcommand.data.name == subcommandName);
    if (subcommand.autocompleter)
      return await interaction.respond(
        (await subcommand.autocompleter(interaction)).map(choice => ({ name: choice, value: choice })),
      );
  }

  // If it is a subcommand in a subcommand group
  const subcommandGroupName = interaction.options.getSubcommandGroup();
  if (subcommandGroupName) {
    const subcommandGroup = command.subcommandGroups.find(subcommandGroup => subcommandGroup.data.name == subcommandGroupName);
    const subcommandName = interaction.options.getSubcommand();
    if (subcommandName) {
      const subcommand = subcommandGroup.subcommands.find(subcommand => subcommand.data.name == subcommandName);
      if (subcommand.autocompleter)
        return await interaction.respond(
          (await subcommand.autocompleter(interaction)).map(choice => ({ name: choice, value: choice })),
        );
    }
  }
}