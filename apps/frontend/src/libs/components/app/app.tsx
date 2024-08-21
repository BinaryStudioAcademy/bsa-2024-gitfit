import { useState } from "react";
import { type MultiValue, type SingleValue } from "react-select";

import reactLogo from "~/assets/images/react.svg";
import {
	CustomSelect,
	Link,
	Loader,
	RouterOutlet,
	Table,
} from "~/libs/components/components.js";
import {
	mockColumns as mockTableColumns,
	mockData as mockTableData,
	type Person,
} from "~/libs/components/table/mock-data.js";
import { AppRoute } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	useLocation,
} from "~/libs/hooks/hooks.js";
import { actions as userActions } from "~/modules/users/users.js";

import { type Option } from "../custom-select/libs/types/option.type.js";

const App = (): JSX.Element => {
	// Following code is for CustomSelect testing
	const options = [
		{ label: "1", value: "1" },
		{ label: "2", value: "2" },
		{ label: "3", value: "3" },
		{ label: "4", value: "4" },
		{ label: "5", value: "5" },
	];
	const [singleValue, setSingleValue] = useState<Option>({
		label: "1",
		value: "1",
	});

	function handleSingleChange(
		newValue: MultiValue<Option> | SingleValue<Option>,
	): void {
		setSingleValue(newValue as Option);
	}
	// End of CustomSelect testing

	const dispatch = useAppDispatch();
	const { pathname } = useLocation();
	const dataStatus = useAppSelector(({ users }) => users.dataStatus);
	const users = useAppSelector(({ users }) => users.users);

	const isRoot = pathname === AppRoute.ROOT;
	const isLoading = dataStatus === "pending";

	useEffect(() => {
		if (isRoot) {
			void dispatch(userActions.loadAll());
		}
	}, [isRoot, dispatch]);

	return (
		<>
			<img alt="logo" src={reactLogo} width="30" />

			<ul>
				<li>
					<Link to={AppRoute.ROOT}>Root</Link>
				</li>
				<li>
					<Link to={AppRoute.SIGN_IN}>Sign in</Link>
				</li>
				<li>
					<Link to={AppRoute.SIGN_UP}>Sign up</Link>
				</li>
			</ul>
			<p>Current path: {pathname}</p>

			<div>
				<RouterOutlet />
			</div>
			{isRoot && (
				<>
					<h2>Users:</h2>
					<h3>Status: {dataStatus}</h3>

					{isLoading ? (
						<Loader />
					) : (
						<ul>
							{users.map((user) => (
								<li key={user.id}>{user.email}</li>
							))}
						</ul>
					)}
					<Table<Person> columns={mockTableColumns} data={mockTableData} />
				</>
			)}
			<CustomSelect
				// eslint-disable-next-line react/jsx-no-bind
				onChange={handleSingleChange}
				options={options}
				value={singleValue}
			/>
		</>
	);
};

export { App };
