/*
 * @Desc: 
 * @Date: 2020-04-23 10:33:22
 * @LastEditors: Nice
 * @LastEditTime: 2020-08-27 11:37:45
 */
export default {
    data() {
        return {

        }
    },
    methods: {
        changeStrToArray(str1, per, str_before, str_after) {
            // let str1
            let arr = [];
            let n = str1.length / per;
            for (let x = 0; x < n; x++) {
                let str2 = `${str1.substring(x*per,(x+1)*per-1)}`
                    // arr.push({ url: "http://www.aaa.com", text: `${str2}` }, )
                arr.push(str2)
            }
            console.log(arr,str_before,str_after)
            console.log(JSON.stringify(arr))

        }
    },
}