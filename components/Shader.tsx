import { useEffect } from "react";
import {
	Canvas,
	Fill,
	useClock,
	vec,
	Vertices,
	Vec3,
	Skia,
	Shader,
} from "@shopify/react-native-skia";
import Animated, {
	useDerivedValue,
	useSharedValue,
} from "react-native-reanimated";
import { Dimensions } from "react-native";
import cdt2d from "cdt2d";
import { createNoise2D } from "simplex-noise";
import alea from "alea";
import { useUnistyles } from "react-native-unistyles";
let { width, height } = Dimensions.get("window");
const N = 6;
const n = new Array(N + 1).fill(0).map((_, i) => i);
const hSize = width / N;
const vSize = height / N;
const AX = hSize * 0.4;
const AY = vSize * 0.4;
const F = 4500;
const defaultVertices = n
	.map((col) => n.map((row) => vec(col * hSize, row * vSize)))
	.flat();
const triangles = cdt2d(defaultVertices.map(({ x, y }) => [x, y]));
const indices = triangles.flat();
const noiseFns = defaultVertices.map((_, i) => createNoise2D(alea(i)));

const grainShader = Skia.RuntimeEffect.Make(`
	uniform vec2 resolution;
	uniform float time;
	
	float rand(vec2 co) {
		return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
	}
	
	vec4 main(vec2 pos) {
		vec2 uv = pos / resolution;           // normalize x,y to 0-1
		float noise = rand(uv + time/pos);        // per-pixel animated noise
		float grain = (noise - 0.5) * 22.5;   // subtle variation
		return vec4(vec3(grain), 1.0);        // white-ish grain
	}
	`);

export const Shader1 = () => {
	const t = useClock();

	const uniforms = useDerivedValue(
		() => ({
			time: t.value,
			resolution: [width, height],
		}),
		[t],
	);
	const vertices = useSharedValue(defaultVertices);
	const { rt } = useUnistyles();
	const newArray = [0, 1, 2];
	const mix = (colour1: Vec3, colour2: Vec3, y: number) => {
		const colour1Math = colour1.map((colour) => colour * (1 - y));
		const colour2Math = colour2.map((colour) => colour * y);
		const whatIReallyWant = newArray.map(
			(i) => colour1Math[i]! + colour2Math[i]!,
		);
		return `rgb(${whatIReallyWant})`;
	};

	const colors: string[] =
		rt.themeName == "dark"
			? [mix([63, 65, 64], [31, 33, 32], 0.5)]
			: [mix([230, 232, 226], [165, 168, 160], 0.5)];

	const vertexColour = useSharedValue(colors);

	useEffect(() => {
		let frameId: number;
		const animate = (timestamp: number) => {
			vertices.value = defaultVertices.map(({ x, y }, i) => {
				const isEdgeX = x === 0 || x === width;
				const isEdgeY = y === 0 || y === height;

				return {
					x: isEdgeX ? x : x + AX * noiseFns[i]!(timestamp / F, 0),
					y: isEdgeY ? y : y + AY * noiseFns[i]!(0, timestamp / F),
				};
			});

			vertexColour.value = defaultVertices.map(({ x, y }, i) => {
				return rt.themeName === "dark"
					? mix(
							[63, 65, 64],
							[31, 33, 32],
							y / height +
								(AY * noiseFns[i]!(0, timestamp / F) - -100) / (100 - -100),
						)
					: rt.themeName === "light"
						? mix(
								[230, 232, 226],
								[165, 168, 160],
								y / height +
									(AY * noiseFns[i]!(0, timestamp / F) - -100) / (100 - -100),
							)
						: "";
			});

			frameId = requestAnimationFrame(animate);
		};

		frameId = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(frameId);
	}, [rt.themeName]);
	return (
		<Canvas
			style={{
				width,
				height,
				position: "absolute",
				top: 0,
			}}>
			<Vertices
				vertices={vertices}
				indices={indices}
				colors={vertexColour}></Vertices>
			<Fill opacity={0.015}>
				{grainShader && <Shader source={grainShader} uniforms={uniforms} />}
			</Fill>
		</Canvas>
	);
};
