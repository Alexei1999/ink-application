"use strict";
process.env.FORCE_COLOR = "1";
//npx babel index.js -o run.js; node ./run.js

import React from "react";
import { Text, Color, Box, render } from "ink";
import si from "systeminformation";
import sn from "serial-number";
import crypto from "crypto";
import Gradient from "ink-gradient";
import BigText from "ink-big-text";
import TextInput from "ink-text-input";
import Spinner from "ink-spinner";
import { useState, useEffect } from "react";

const App = () => {
	const devices = ["flash drive", "CPU", "HDD", "mac-address", "ip-address"];
	const ciphers = ["aes256", "aes128"];

	const [keys, setKeys] = useState({});
	const [time, setTime] = useState(0);
	const [status, setStatus] = useState(undefined);
	const [query, setQuery] = useState("");
	const [encrypts, setEncrypts] = useState({});

	useEffect(() => {
		if (status === "Encryption") {
		}
	}, [status]);

	useEffect(() => {
		const interval = setInterval(() => {
			setTime((time) => time + 1);
			if (
				status != "Encryption" &&
				status != "Fulfilled" &&
				Object.entries(keys).filter(([key, value]) => value).length ==
					devices.length - 1
			)
				setStatus("Fulfilled");
		}, 1000);

		return () => clearInterval(interval);
	});

	useEffect(() => {
		si.blockDevices().then((data) => {
			const serial = data.find((obj) => obj.name === "E:")?.serial;
			if (!serial) setStatus("Cannot find flash drive");
			setKeys((keys) => ({
				...keys,
				...{ "flash drive": serial },
			}));
		});

		sn((err, value) => {
			if (err) setStatus("Cannot find CPU");
			setKeys((keys) => ({ ...keys, ...{ CPU: value } }));
		});

		si.diskLayout().then((data) => {
			if (!data) setStatus("Cannot find HDD");
			setKeys((keys) => ({ ...keys, ...{ HDD: data.pop().serialNum } }));
		});

		si.networkInterfaces().then((data) => {
			if (!data) setStatus("Cannot get mac-address");
			setKeys((keys) => ({ ...keys, ...{ "mac-address": data.shift().mac } }));
		});

		si.networkInterfaces().then((data) => {
			if (!data) setStatus("Cannot get ip-address");
			setKeys((keys) => ({ ...keys, ...{ "ip-address": data.shift().ip4 } }));
		});
	}, []);

	const handleSubmit = () => {
		setStatus("Encryption");
	};

	return (
		<Box flexDirection="column">
			<Text>
				<Gradient name="rainbow">
					<BigText text="Lab 1" />
				</Gradient>
			</Text>
			{status != "Encryption" && (
				<Box flexDirection="column">
					{devices.map((device, i) => {
						let color = "yellow";
						let deviceColor = undefined;
						let prefix = <Spinner type="line" />;
						let value = "[Pending]";

						if (device in keys) {
							color = "red";
							prefix = "✘";
							deviceColor = "gray";
							value = "Not available";
						}
						if (keys[device]) {
							color = "green";
							prefix = "✔";
							deviceColor = undefined;
							value = keys[device];
						}

						return (
							<Box key={i}>
								<Box width="14">
									<Text>
										<Text color={color}>{prefix}</Text>{" "}
										<Text color={deviceColor}>{device}</Text>
									</Text>
								</Box>
								<Text key={i}>
									<Text color={color}>{value}</Text>
								</Text>
							</Box>
						);
					})}
				</Box>
			)}
			{status !== "Fulfilled" && <Text color="blue">{time} c.</Text>}
			{status && (
				<Text
					color={
						status === "Fulfilled"
							? "green"
							: status === "Encryption"
							? "blue"
							: "red"
					}
				>
					{status}
				</Text>
			)}
			{status === "Fulfilled" && (
				<>
					<Box>
						<Text>Plaintext input</Text>
						<Spinner type="simpleDots" />
					</Box>
					<TextInput
						value={query}
						onChange={setQuery}
						onSubmit={handleSubmit}
						placeholder="enter text"
					/>
				</>
			)}
			{status === "Encryption" && (
				<Box flexDirection="column">
					<Text>
						Plaint text: <Text color="yellow">{query}</Text>
					</Text>
					{ciphers.map((cipher, i) => (
						<Box key={i}>
							<Text>{cipher}</Text>
							<Text> --{">"} </Text>
							<Text> ??? </Text>
						</Box>
					))}
				</Box>
			)}
		</Box>
	);
};

render(<App />);
