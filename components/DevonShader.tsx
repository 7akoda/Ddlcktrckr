import {
	Canvas,
	Fill,
	Shader,
	Skia,
	useClock,
} from "@shopify/react-native-skia";
import { Dimensions } from "react-native";
import { useDerivedValue } from "react-native-reanimated";
const { width, height } = Dimensions.get("window");

export const DevShader = () => {
	const t = useClock();
	const devonShader = Skia.RuntimeEffect.Make(`
        uniform float2 resolution;
        uniform float time;
        
        half4 main(float2 fragCoord) {
        
            float2 uv = (fragCoord - 0.5 * resolution) / resolution.y;
        
            // very slow global motion
            float t = time /10000;
        
            // gentle organic warp
            uv += 0.08 * float2(
                sin(uv.y * 2.0 + t),
                cos(uv.x * 2.0 - t)
            );
        
            float2 p = uv;
        
            // calmer fractal structure
            for (int i = 0; i < 5; i++) {
                float r = max(dot(p,p), 0.2);
                p = abs(p) / r - 0.55;
            }
        
            float d = length(p);
        
            // softer glow
            float glow = clamp(0.04 / (d + 0.2), 0.0, 1.0);
        
            // slow breathing pulse
            glow *= 0.75 + 0.25 * sin(time * 0.3);
        
            float3 base = float3(0.02, 0.025, 0.02);
            float3 accent = float3(0.45, 0.75, 0.4);
        
            float3 color = mix(base, accent, glow);
        
            // subtle grain (not flickering hard)
            float grain = fract(
                sin(dot(fragCoord.xy, float2(12.9898,78.233))) * 43758.5453
            );
        
            color += (grain - 0.5) * 0.02;
        
            return half4(color, 1.0);
        }
        `);
	if (!devonShader) {
		throw new Error("Shader compilation failed");
	}
	const uniforms = useDerivedValue(
		() => ({
			time: t.value,
			resolution: [width, height],
		}),
		[t]
	);
	return (
		<Canvas style={{ width, height, position: "absolute", top: 0, zIndex: 5 }}>
			<Fill>
				{devonShader && <Shader source={devonShader} uniforms={uniforms} />}
			</Fill>
		</Canvas>
	);
};
