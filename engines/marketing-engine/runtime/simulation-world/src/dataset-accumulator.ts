export interface DataPoint { day:number; channel:string; metric:string; value:number; }

export class DatasetAccumulator {
  private data: DataPoint[] = [];
  record(day:number, channel:string, metric:string, value:number) { this.data.push({day,channel,metric,value}); }
  getAll(): DataPoint[] { return this.data; }
  getByMetric(metric:string): DataPoint[] { return this.data.filter(d=>d.metric===metric); }
  getByChannel(channel:string): DataPoint[] { return this.data.filter(d=>d.channel===channel); }
  exportJSON(): string { return JSON.stringify(this.data); }
  exportCSV(): string {
    return 'day,channel,metric,value\n'+this.data.map(d=>`${d.day},${d.channel},${d.metric},${d.value}`).join('\n');
  }
  size(): number { return this.data.length; }
}
