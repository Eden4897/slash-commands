import { SlashCommandBuilder, SlashCommandSubcommandBuilder, SlashCommandSubcommandGroupBuilder, SlashCommandSubcommandsOnlyBuilder } from "@discordjs/builders";
import { AutocompleteInteraction, ChatInputCommandInteraction } from "discord.js";
export declare class Command {
    data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
    private _execute?;
    get execute(): (interaction: ChatInputCommandInteraction) => any;
    set execute(fn: (interaction: ChatInputCommandInteraction) => any);
    constructor(opt: Command);
    subcommandGroups?: SubcommandGroup[];
    subcommands?: Subcommand[];
    autocompleter?: (interaction: AutocompleteInteraction) => string[] | Promise<string[]> | {
        name: string;
        value: string;
    }[] | Promise<{
        name: string;
        value: string;
    }[]>;
}
export declare class Subcommand {
    data: SlashCommandSubcommandBuilder;
    execute: (interaction: ChatInputCommandInteraction) => any;
    constructor(opt: Subcommand);
    autocompleter?: (interaction: AutocompleteInteraction) => string[] | Promise<string[]> | {
        name: string;
        value: string;
    }[] | Promise<{
        name: string;
        value: string;
    }[]>;
}
export declare class SubcommandGroup {
    data: SlashCommandSubcommandGroupBuilder;
    private _execute?;
    get execute(): (interaction: ChatInputCommandInteraction) => any;
    set execute(fn: (interaction: ChatInputCommandInteraction) => any);
    constructor(opt: SubcommandGroup);
    subcommands?: Subcommand[];
}
