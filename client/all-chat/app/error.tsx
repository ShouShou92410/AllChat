'use client';

import React from 'react';

interface IProps {
	error: Error;
	reset: () => void;
}
export default function Error({ error, reset }: IProps) {
	return (
		<div className="flex h-screen items-center justify-center">
			<p>{error.message}</p>
		</div>
	);
}
