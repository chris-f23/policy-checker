export type User = {
  id: string;
};

export type Resource = {
  id: string;
};

export type Policy = {
  resource_type: string;
  capability: "allow" | "deny";
  action: "create" | "read" | "update" | "delete" | "all";
  condition: string;
  // validate: (params: { user: User; resource: Resource }) => boolean;
};
