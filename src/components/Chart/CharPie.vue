<template>
  <div
    ref="chartElement"
    :id="chartId"
    :class="cssClasses"
    :style="containerStyle"
    role="img"
    :aria-label="accessibleLabel"
  />
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import type { CSSProperties } from "vue";
import * as echarts from "echarts";
import type { ECharts, EChartsOption } from "echarts";

interface ChartDataset {
  data?: unknown;
  backgroundColor?: unknown;
}

const props = withDefaults(
  defineProps<{
    chartData?: Record<string, unknown>;
    title?: Record<string, unknown>;
    chartId?: string;
    datasetIdKey?: string;
    width?: number;
    height?: number;
    cssClasses?: string;
    styles?: CSSProperties;
    plugins?: Record<string, unknown>;
  }>(),
  {
    chartData: () => ({}),
    title: () => ({ display: false, text: "CharPie" }),
    chartId: "pie-chart",
    datasetIdKey: "label",
    width: 300,
    height: 300,
    cssClasses: "",
    styles: () => ({}),
    plugins: () => ({}),
  },
);

type ChartElement = Parameters<typeof echarts.init>[0];

const chartElement = ref<ChartElement | null>(null);
let chart: ECharts | null = null;

const containerStyle = computed<CSSProperties>(() => ({
  width: `${props.width}px`,
  height: `${props.height}px`,
  ...props.styles,
}));

const accessibleLabel = computed(() => {
  const title = props.title.text;
  return typeof title === "string" && title.length > 0 ? title : "Pie chart";
});

function getChartOption(): EChartsOption {
  const labels = Array.isArray(props.chartData.labels)
    ? props.chartData.labels
    : [];
  const datasets = Array.isArray(props.chartData.datasets)
    ? props.chartData.datasets
    : [];
  const firstDataset = datasets[0];
  const dataset: ChartDataset =
    firstDataset !== null && typeof firstDataset === "object"
      ? firstDataset as ChartDataset
      : {};
  const values = Array.isArray(dataset.data) ? dataset.data : [];
  const colors = Array.isArray(dataset.backgroundColor)
    ? dataset.backgroundColor
    : [];

  const data = values
    .map((rawValue, index) => {
      const value =
        typeof rawValue === "number" || typeof rawValue === "string"
          ? Number(rawValue)
          : Number.NaN;
      if (!Number.isFinite(value)) return null;

      const rawLabel = labels[index];
      const item: {
        name: string;
        value: number;
        itemStyle?: { color: string };
      } = {
        name:
          typeof rawLabel === "string" && rawLabel.length > 0
            ? rawLabel
            : `Item ${index + 1}`,
        value,
      };

      const color = colors[index];
      if (typeof color === "string" && color.length > 0) {
        item.itemStyle = { color };
      }

      return item;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return {
    title: {
      show: props.title.display === true,
      text: typeof props.title.text === "string" ? props.title.text : "",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      confine: true,
      backgroundColor: "rgba(15, 23, 42, 0.92)",
      borderWidth: 0,
      padding: [8, 12],
      textStyle: { color: "#fff", fontSize: 13 },
      formatter: "{b}<br/><b>{c}</b> ({d}%)",
    },
    graphic: [
      {
        type: "text",
        left: "center",
        top: "center",
        silent: true,
        style: {
          text: `${total}\nTổng`,
          textAlign: "center" as const,
          fill: "#0f172a",
          font: "700 16px sans-serif",
          lineHeight: 20,
        },
      },
    ] as EChartsOption["graphic"],
    series: [
      {
        type: "pie",
        radius: ["58%", "88%"],
        center: ["50%", "50%"],
        data,
        padAngle: 2,
        minAngle: 4,
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 8,
          borderColor: "#fff",
          borderWidth: 2,
          shadowBlur: 8,
          shadowColor: "rgba(15, 23, 42, 0.18)",
        },
        label: { show: false },
        labelLine: { show: false },
        emphasis: {
          scale: true,
          scaleSize: 8,
          itemStyle: {
            shadowBlur: 18,
            shadowColor: "rgba(15, 23, 42, 0.35)",
          },
        },
        animationType: "expansion",
        animationDuration: 900,
        animationEasing: "cubicOut",
      },
    ],
  };
}

function updateChart() {
  chart?.setOption(getChartOption(), { notMerge: true });
  chart?.resize();
}

onMounted(() => {
  if (!chartElement.value) return;

  chart = echarts.init(chartElement.value);
  updateChart();
});

watch(
  () => [props.chartData, props.title, props.width, props.height, props.styles],
  updateChart,
  { deep: true },
);

onBeforeUnmount(() => {
  chart?.dispose();
  chart = null;
});
</script>
