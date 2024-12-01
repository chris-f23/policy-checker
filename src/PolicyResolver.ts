import { Policy, Resource, User } from "./types";

function parse(raw: string): string[] {
  const after = raw
    .replaceAll(commentRegex, " ")
    .replaceAll(emptySpacesRegex, " ")
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  // console.debug({
  //   before: raw,
  //   after: after,
  // });

  return after;
}

export class PolicyResolver {
  readonly policies: Policy[];

  constructor(raw: string) {
    const policies: Policy[] = [];
    for (const rawStatement of parse(raw)) {
      const result = rawStatement.match(policyRegex);
      if (result === null) {
        console.warn(`INVALID: ${JSON.stringify(rawStatement)}`);
        continue;
      }
      const resource_type = result.groups!.resourceType;

      let capability;
      if (result.groups?.capability === "PERMITIR") {
        capability = "allow";
      } else if (result.groups?.capability === "DENEGAR") {
        capability = "deny";
      }

      let action;
      switch (result.groups?.action) {
        case "VER":
          action = "read";
          break;
        case "CREAR":
          action = "create";
          break;
        case "EDITAR":
          action = "update";
          break;
        case "ELIMINAR":
          action = "delete";
          break;
        case "TODO":
          action = "all";
          break;
        default:
          break;
      }

      const condition = result.groups!.condition;

      const policy: Policy = {
        resource_type,
        capability,
        action,
        condition,
        // validate: () => true,
      };

      policies.push(policy);
    }
    this.policies = policies;
  }
}

const policyRegex = new RegExp(
  // /(?<resourceType>\[.+\]) (?<capability>PERMITIR|DENEGAR) (?<action>TODO|VER|CREAR|EDITAR|ELIMINAR) SI (?<condition>.+)/
  /(?<capability>PERMITIR|DENEGAR)\s*(?<action>VER|CREAR|EDITAR|ELIMINAR|TODO)\s*\[(?<resourceType>[a-z0-9._-]+|\*)\]\s*SI\s*(?<condition>[\s\S]+)/
);

const commentRegex = new RegExp(/\/\*[\s\S]*?\*\//g);
const emptySpacesRegex = new RegExp(/(\s{2,}|\n\r\t)/g);
