import React from 'react';
import Apiurl,{site_url,Admin} from '../../Apiurl'; 



export function get_admin_header_item(retrunmenulisting){
      let  menudata=null;
      let menulist={menu:"main-navigation-admin"};
         fetch(Admin.menulisting.url,{
             headers:{
                     "Content-Type" : "application/json",
                     "Authorization": "Basic "+localStorage.getItem("basic-auth"),
               },
               method:Admin.menulisting.method,
               body:JSON.stringify(menulist)
         }).then(res=>{return res.json()}).then(data=>{
                        menudata=data; 
                        //console.log(retrunmenulisting);
         });
         return menudata;
   }