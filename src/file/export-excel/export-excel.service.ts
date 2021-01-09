import { Injectable } from '@nestjs/common';
// import { ObjectType } from '@src/types';
import xlsx from 'node-xlsx';
import fs from 'fs'

@Injectable()
export class ExportExcelService {
  /**
   * 导出excel
   * @param titleList 标题
   * @param dataList 数据
   * @param xlsName sheet的名称
   */
  public exportExcel(titleList: Array<{ label: string, value: string }>, dataList: any[], xlsName = 'sheet1'): ArrayBuffer {
    console.log('22222222222222222222')
    const data = []; // 其实最后就是把这个数组写入excel   
    data.push(titleList.map(item => item.label)); // 添加完列名 下面就是添加真正的内容了
    dataList.forEach((element) => {
      const arrInner = [];
      for (let i = 0; i < titleList.length; i++) {
        arrInner.push(element[titleList[i].value]);
      }
      data.push(arrInner); // data中添加的要是数组，可以将对象的值分解添加进数组，例如：['1','name','上海']
    });
    const buffer = xlsx.build([
      {
        name: xlsName,
        data
      }
    ]);
    let fileName = '茅台净利润数据.xlsx';
    fs.writeFile(fileName, buffer, (err) => {
      if (err) throw err;
      console.log('保存成功');
    });
    return buffer;
  }
}
