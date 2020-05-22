import axios from 'axios'
import _this from '../store'
import {BASE_URL} from "../config";

export let $get_header  = (url,data)=>{
    return axios.get(BASE_URL+url,{
        params:data,
        headers:{
            'token':_this.state.token
        }
    })
}
export let $post_header_json = (url,data)=>{
    //console.log(_this.state)
    return axios.post(BASE_URL+url,data,{
        headers:{
            'token':_this.state.token,
            'Content-Type':'application/json'
        }
    })
};
export let $post_header  = (url,data)=>{
    return axios.post(BASE_URL+url,data,{
        headers:{
            'token':_this.state.token,
        }
    })
};

export let $delete_header = (url,id)=>{
    return axios.delete(BASE_URL+url+'?id='+id,{
        headers:{
            'token':_this.state.token
        }
    })
};

export let format = function(number,format){
    var formateArr  = ['Y','M','D','h','m','s'];
    var returnArr   = [];

    var date = new Date(number );
    returnArr.push(date.getFullYear());
    returnArr.push(formatNumber(date.getMonth() + 1));
    returnArr.push(formatNumber(date.getDate()));

    returnArr.push(formatNumber(date.getHours()));
    returnArr.push(formatNumber(date.getMinutes()));
    returnArr.push(formatNumber(date.getSeconds()));

    for (var i in returnArr)
    {
        format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
}
//数据转化
function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}
