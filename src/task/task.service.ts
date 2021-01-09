import { Injectable } from '@nestjs/common';
import axios from 'axios'
import * as cheerio from 'cheerio'
import * as fs from 'fs'
import xlsx from 'node-xlsx';

@Injectable()
export class TaskService {



    /**
       *
       * 访问商品获取名称拿cookie
       * @returns
       * @memberof ProductService
       */
    async getProduct() {
        const url = `http://quotes.money.163.com/f10/zycwzb_600519.html#01c01`;
        const res = await axios.get(url).then(res => {
            // console.log(res);
            var $ = cheerio.load(res.data);
            // console.log('11111111111111111111111111111111')
            // console.log($, res)
            let title = []
            let data = []
            $(".scr_table tbody tr").each(function (i, e) {
                if (i == 0) {
                    $(this).find('th').each(function (c, el) {
                        console.log(c)
                        title.push({ label: $(this).text(), value: c })
                    })
                    // console.log($(this).text());
                }
                if (i == 11) {
                    $(this).find('td').each(function (c, el) {
                        // title[title.length - 1].value = c
                        data.push($(this).text())
                    })
                    // console.log($(this).text());
                }
            });
            // console.log(title, data)
            var buffer: ArrayBuffer = this.exportExcel(title, data)
            // let fileName='茅台净利润数据';
            // fs.writeFile(fileName, buffer:ArrayBuffer, (err) => {
            //     if (err) throw err;
            //     console.log('保存成功');
            //   });

        });

    }
    /**
   * 导出excel
   * @param titleList 标题
   * @param dataList 数据
   * @param xlsName sheet的名称
   */
    exportExcel(titleList: Array<{ label: string, value: string }>, dataList: any[], xlsName = 'sheet1'): ArrayBuffer {
        console.log('22222222222222222222')
        const data = []; // 其实最后就是把这个数组写入excel   
        data.push(titleList.map(item => item.label)); // 添加完列名 下面就是添加真正的内容了
        data.push(dataList)
        console.log(titleList)
        // dataList.forEach((element) => {
        //     const arrInner = [];
        //     // console.log(element)
        //     for (let i = 0; i < titleList.length; i++) {
        //         arrInner.push(element[titleList[i].value]);
        //     }
        //     // console.log(arrInner)
        //     data.push(arrInner); // data中添加的要是数组，可以将对象的值分解添加进数组，例如：['1','name','上海']
        // });
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
