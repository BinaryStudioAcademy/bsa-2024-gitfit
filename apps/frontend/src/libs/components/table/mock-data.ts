import { type ColumnDef } from "@tanstack/react-table";

type Person = {
	createdAt: string;
	name: string;
	permissions: string;
	projects: string;
};

const data: Person[] = [
	{
		createdAt: "Jan 26, 2008 12:23",
		name: "Gravida",
		permissions: "Permission 1, Permission 2",
		projects: "Project 1, Project 2",
	},
	{
		createdAt: "Jan 2",
		name: "Laoreet",
		permissions: "Permission 1, Permission 2",
		projects: "Project 1, Project 2",
	},
	{
		createdAt: "Jan 26, 2008 12:23",
		name: "Netus",
		permissions: "Permission 1, Permission 2",
		projects: "Project 1, Project 2",
	},
	{
		createdAt: "Jan 26, 2008 12:23",
		name: "Sed",
		permissions: "Permission 1, Permission 2",
		projects: "Project 1, Project 2",
	},
	{
		createdAt: "Jan 26, 2008 12:23",
		name: "Malesuada",
		permissions: "Permission 1, Permission 2",
		projects: "Project 1, Project 2",
	},
	{
		createdAt: "Jan 26, 2008 12:23",
		name: "Non",
		permissions: "Permission 1, Permission 2",
		projects: "Project 1, Project 2",
	},
	{
		createdAt: "Jan 26, 2008 12:23",
		name: "Vel",
		permissions: "Permission 1, Permission 2",
		projects: "Project 1, Project 2",
	},
];

const columns: ColumnDef<Person>[] = [
	{ accessorKey: "name", header: "Name" },
	{ accessorKey: "permissions", header: "Permissions" },
	{ accessorKey: "projects", header: "Projects" },
	{ accessorKey: "createdAt", header: "Created At" },
];

export { columns, data, type Person };
