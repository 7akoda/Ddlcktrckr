import { Canvas, Fill, Shader, Skia } from "@shopify/react-native-skia";
import { useWindowDimensions } from "react-native";
import { useState, useEffect } from "react";

const source = Skia.RuntimeEffect.Make(`
// Magic particles — SkSL conversion
const float twopi = 6.28319;
const int nb_particles = 95;
const float2 gen_scale = float2(0.95);
const float2 middlepoint = float2(0.0, 0.6);
const float2 gravitation = float2(0, -4.5);
const float3 main_x_freq = float3(0.4, 0.66, 0.78);
const float3 main_x_amp = float3(0.8, 0.24, 0.18);
const float3 main_x_phase = float3(0, 45, 55);
const float3 main_y_freq = float3(0.415, 0.61, 0.82);
const float3 main_y_amp = float3(0.72, 0.28, 0.15);
const float3 main_y_phase = float3(90, 120, 10);
const float part_timefact_min = 6;
const float part_timefact_max = 20;
const float2 part_max_mov = float2(0.28, 0.28);
const float time_factor = 0.25;
const float start_time = 2.5;
const float grow_time_factor = 0.15;
const float part_life_time_min = 0.9;
const float part_life_time_max = 3.0;
const float part_int_div = 60000;
const float part_int_factor_min = 0.1;
const float part_int_factor_max = 3.2;
const float part_spark_min_int = 0.25;
const float part_spark_max_int = 0.88;
const float part_spark_min_freq = 2.5;
const float part_spark_max_freq = 6.0;
const float part_spark_time_freq_fact = 0.35;
const float mp_int = 0.0;
const float dist_factor = 3.0;
const float ppow = 2.3;
const float part_min_saturation = 0.5;
const float part_max_saturation = 0.9;
const float mp_saturation = 0.18;
const float2 part_starhv_dfac = float2(9, 0.32);
const float part_starhv_ifac = 0.20;
const float2 part_stardiag_dfac = float2(13, 0.61);
const float part_stardiag_ifac = 0.14;
const float mb_factor = 0.70;

uniform float iTime;
uniform float2 iResolution;

float pst, plt, runnr, time2, time3, time4;

float3 hsv2rgb(float3 hsv) {
  hsv.yz = clamp(hsv.yz, 0, 1);
  return hsv.z * (0.63 * hsv.y * (cos(twopi * (hsv.x + float3(0, 2.0/3.0, 1.0/3.0))) - 1) + 1);
}

float random(float co) {
  return fract(sin(co * 12.989) * 43758.545);
}

float harms(float3 freq, float3 amp, float3 phase, float time) {
  float val = 0;
  for (int h = 0; h < 3; h++) {
    val += amp[h] * cos(time * freq[h] * twopi + phase[h] / 360 * twopi);
  }
  return (1 + val) * 0.5;
}

float2 getParticlePosition(int i) {
  float part_timefact = mix(part_timefact_min, part_timefact_max, random(float(i * 2 + 94) + runnr * 1.5));
  float ptime = (runnr * plt + pst) * (-1 / part_timefact + 1) + time2 / part_timefact;
  
  float2 ppos = float2(
    harms(main_x_freq, main_x_amp, main_x_phase, ptime),
    harms(main_y_freq, main_y_amp, main_y_phase, ptime)
  ) + middlepoint;
  
  float2 delta_pos = part_max_mov * (float2(
    random(float(i * 3 - 23) + runnr * 4),
    random(float(i * 7 + 632) - runnr * 2.5)
  ) - 0.5) * (time3 - pst);
  
  float2 grav_pos = gravitation * pow(time4, 2) / 250;
  return (ppos + delta_pos + grav_pos) * gen_scale;
}

float3 getParticleColor(int i, float pint) {
  float saturation = mix(part_min_saturation, part_max_saturation, 
                         random(float(i * 6 + 44) + runnr * 3.3)) * 0.45 / pint;
  return hsv2rgb(float3(0.75, saturation, pint));
}

float3 drawParticles(float2 uv, float timedelta) {
  time2 = time_factor * (iTime + timedelta);
  float3 pcol = float3(0);
  
  for (int i = 1; i < nb_particles; i++) {
    pst = start_time * random(float(i * 2));
    plt = mix(part_life_time_min, part_life_time_max, random(float(i * 2 - 35)));
    time4 = mod(time2 - pst, plt);
    time3 = time4 + pst;
    runnr = floor((time2 - pst) / plt);
    
    float2 ppos = getParticlePosition(i);
    float dist = distance(uv, ppos);
    
    float pint0 = mix(part_int_factor_min, part_int_factor_max, random(runnr * 4 + float(i - 55)));
    float pint = pint0 * (pow(1 / (dist * dist_factor + 0.015), ppow) / part_int_div) * (1.0 - time4 / plt);
    pint *= smoothstep(0, grow_time_factor * plt, time4);
    
    pcol += getParticleColor(i, pint);
  }
  
  return pcol;
}

half4 main(float2 fragCoord) {
  float2 uv = fragCoord.xy / iResolution.xx;
  half3 pcolor = half3(0);
  pcolor += half3(drawParticles(uv, 0)) * 0.9;
  return half4(pcolor, 1);
}
`);

if (!source) {
	throw new Error("Couldn't compile the shader");
}

export const SimpleShader = () => {
	const { width, height } = useWindowDimensions();
	const [time, setTime] = useState(0);

	useEffect(() => {
		let animationFrameId: number;
		const startTime = Date.now();

		const animate = () => {
			setTime((Date.now() - startTime) / 1000);
			animationFrameId = requestAnimationFrame(animate);
		};

		animate();

		return () => cancelAnimationFrame(animationFrameId);
	}, []);

	return (
		<Canvas style={{ flex: 1 }}>
			<Fill>
				<Shader
					source={source}
					uniforms={{
						iTime: time,
						iResolution: [width, height],
					}}
				/>
			</Fill>
		</Canvas>
	);
};
