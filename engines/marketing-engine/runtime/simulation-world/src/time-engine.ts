export class TimeEngine {
  tick(current:{tick:number,day:number,week:number}, speed:string):{tick:number,day:number,week:number} {
    const t = current.tick+1;
    let d=current.day, w=current.week;
    switch(speed){
      case '1hour/tick': if(t%24===0) d++; if(d%7===0&&d>current.day) w++; break;
      case '1day/tick': d++; if(d%7===0) w++; break;
      case '1week/tick': d+=7; w++; break;
      case '1month/tick': d+=30; w+=4; break;
    }
    return {tick:t,day:d,week:w};
  }
  getSeason(day:number):'spring'|'summer'|'fall'|'winter' {
    const m=(day%365)/30;
    if(m<3) return 'spring'; if(m<6) return 'summer'; if(m<9) return 'fall'; return 'winter';
  }
}
