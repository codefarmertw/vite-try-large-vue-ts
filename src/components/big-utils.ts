interface DataItem {
  id: number;
  name: string;
  value: number;
}

export async function someUtilFunction(
  largeData: DataItem[]
): Promise<DataItem[]> {
  // 模擬耗時操作
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // 隨機處理數據
  const processedData = largeData.map((item) => ({
    ...item,
    value: item.value * Math.random() * 2 // 隨機調整 value
  }));

  // 隨機排序
  processedData.sort(() => Math.random() - 0.5);

  // 隨機選擇 70% 到 90% 的數據
  const selectionRate = 0.7 + Math.random() * 0.2;
  const selectedData = processedData.slice(
    0,
    Math.floor(processedData.length * selectionRate)
  );

  return selectedData;
}
