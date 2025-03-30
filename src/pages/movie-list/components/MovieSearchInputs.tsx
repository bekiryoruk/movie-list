import React from 'react';
import { Stack, TextField, Select, MenuItem } from '@mui/material';

interface MovieSearchInputsProps {
	query: string;
	setQuery: (value: string) => void;
	year: string;
	setYear: (value: string) => void;
	type: string;
	setType: (value: string) => void;
}

const MovieSearchInputs: React.FC<MovieSearchInputsProps> = ({
	query,
	setQuery,
	year,
	setYear,
	type,
	setType,
}) => {
	const currentYear = new Date().getFullYear();
	const years = Array.from(new Array(currentYear - 1899), (_, index) => 1900 + index);

	return (
		<Stack direction={{ xs: 'column', sm: 'row' }} justifyContent='center' spacing={2} mb={3}>
			<TextField
				label='Search'
				variant='outlined'
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<Select
				value={year}
				onChange={(e) => setYear(e.target.value)}
				displayEmpty
				variant='outlined'
				MenuProps={{
					PaperProps: {
						style: {
							maxHeight: 224,
							overflowY: 'auto',
						},
					},
				}}
			>
				<MenuItem value=''>All Years</MenuItem>
				{years.map((year) => (
					<MenuItem key={year} value={year.toString()}>
						{year}
					</MenuItem>
				))}
			</Select>
			<Select
				value={type}
				onChange={(e) => setType(e.target.value)}
				displayEmpty
				variant='outlined'
			>
				<MenuItem value=''>All</MenuItem>
				<MenuItem value='movie'>Movie</MenuItem>
				<MenuItem value='series'>TV Series</MenuItem>
				<MenuItem value='episode'>Episode</MenuItem>
			</Select>
		</Stack>
	);
};

export default MovieSearchInputs;
