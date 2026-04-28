export const getProperties = (match: any) => {
	return [
		match.tooltip_details?.info_sections?.[0]?.properties_block?.[0]
			?.properties,
		match.tooltip_details?.info_sections?.[0]?.properties_block?.[1]
			?.properties,
		match.tooltip_details?.info_sections?.[0]?.properties_block?.[2]
			?.properties,
		match.tooltip_details?.info_sections?.[1]?.properties_block?.[0]
			?.properties,
		match.tooltip_details?.info_sections?.[1]?.properties_block?.[1]
			?.properties,
		match.tooltip_details?.info_sections?.[2]?.properties_block?.[0]
			?.properties,
		match.tooltip_details?.info_sections?.[2]?.properties_block?.[1]
			?.properties,
	].flat();
};
