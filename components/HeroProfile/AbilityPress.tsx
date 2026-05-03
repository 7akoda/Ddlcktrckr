import { CustomText } from "@/components/CustomText";
import { Pressable, View } from "react-native";
import {
	cleanUpgrade,
	valueNumberizer,
} from "../../api/decimaldescriptionTransform";

type abilityPressType = {
	styles: any;
	upgradeSelected: any;
	setUpgrade: any;
	upgradesIndexOne: any;
	setUpgradeSelected: any;
	upgrades: any;
	upgradesIndexTwo: any;
	match: any;
	upgradeRelationArray: any;
};

export const AbilityPress = ({
	setUpgrade,
	match,
	setUpgradeSelected,
	styles,
	upgradeRelationArray,
	upgradeSelected,
	upgrades,
	upgradesIndexOne,
	upgradesIndexTwo,
}: abilityPressType) => {
	const handlePress = (index: number) => {
		const mapUpgrade = (arr: any[]) =>
			arr.map((i: any) => ({ name: i.name, bonus: i.bonus }));

		if (index === upgradeSelected) {
			if (upgradeSelected === 2) {
				setUpgrade(mapUpgrade(upgradesIndexOne));
				setUpgradeSelected(1);
			} else if (upgradeSelected === 1) {
				setUpgrade(mapUpgrade(upgrades[0]));
				setUpgradeSelected(0);
			} else {
				setUpgrade([]);
				setUpgradeSelected(-1);
			}
		} else if (index === 0) {
			setUpgrade(mapUpgrade(upgrades[0]));
			setUpgradeSelected(0);
		} else if (index === 1) {
			setUpgrade(mapUpgrade(upgradesIndexOne));
			setUpgradeSelected(1);
		} else {
			setUpgrade(mapUpgrade(upgradesIndexTwo));
			setUpgradeSelected(2);
		}
	};

	return upgrades.map((uMap: any, index: number) => {
		return (
			<View
				key={index}
				style={
					index <= upgradeSelected
						? styles.inspectAbilitySelected
						: styles.inspectAbility
				}>
				<Pressable
					style={{ width: 110, height: 70, alignContent: "center" }}
					onPress={() => handlePress(index)}>
					{match.description.t1_desc && index + 1 === 1 ? (
						<CustomText style={styles.inspectAbilityText}>
							{cleanUpgrade(match.description.t1_desc)}
						</CustomText>
					) : match.description.t2_desc && index + 1 === 2 ? (
						<CustomText style={styles.inspectAbilityText}>
							{cleanUpgrade(match.description.t2_desc)}
						</CustomText>
					) : match.description.t3_desc && index + 1 === 3 ? (
						<CustomText style={styles.inspectAbilityText}>
							{cleanUpgrade(match.description.t3_desc)}
						</CustomText>
					) : (
						uMap.map((u: any, index1: number) => {
							return (
								<CustomText style={styles.inspectAbilityText} key={index1}>
									{valueNumberizer(u.bonus)}
									{upgradeRelationArray[index][1].postfix === " m"
										? "m"
										: upgradeRelationArray[index][1].postfix}{" "}
									{upgradeRelationArray[index][1].label}
								</CustomText>
							);
						})
					)}
				</Pressable>
			</View>
		);
	});
};
