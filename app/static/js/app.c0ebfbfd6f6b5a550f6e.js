webpackJsonp([1],{"0X56":function(e,t){},"0h8N":function(e,t){},"2EDS":function(e,t,r){"use strict";var a=r("qiVM"),o=(r.n(a),r("c3y4")),s=r.n(o),i=r("oGFv");t.a={name:"projectpage",components:{visual:s.a},props:["profile"],data:function(){return{project:{name:!1,owner:!1,member:!1,img:""},projectInit:!1,notFound:!1}},methods:{getButton:function(){return i.a.getButton(this.profile.projects,this.project.ID)},likeButton:function(){this.profile.projects.liked=i.a.likeButton(this.profile,this.project.ID)}},computed:{projectPageBack:function(){var e=i.a.getCookie("projectPageBack");return e?"/"+e:"/projects"}},created:function(){var e=this,t=e.$route.params.project;i.b.request("get","/project?route="+t,{},function(t){t.error?"project_not_found"===t.error&&(e.notFound=!0):e.project=t,e.projectInit=!0})}}},"6IFl":function(e,t,r){"use strict";var a=r("8hNy"),o=(r.n(a),r("KvPw")),s=r.n(o),i=r("oGFv"),n=r("c3y4"),c=r.n(n);t.a={name:"ProjectCreate",components:{dropzone:s.a,visual:c.a},props:["profile"],data:function(){return{create:!0,project:{name:"",hashtags:["","",""],members:[],img:0},projectInit:!1,dropzoneOptions:{url:"https://projectf-api.ttrks.de/media/upload",headers:{Accept:"application/json",Authorization:i.a.getCookie("token")},maxFilesize:4,acceptedFiles:"image/*",thumbnailWidth:600,thumbnailHeight:360,previewTemplate:this.dropzoneTemp()},dropzoneDrag:!1,userSearch:[],userSearchStr:"",userSearchLoading:!1,userSearchEmpty:!1,userSearchTimeout:!1}},methods:{dropzoneTemp:function(){return'<div class="dz-preview dz-file-preview">\n              <div class="dz-details">\n                <img data-dz-thumbnail />\n              </div>\n              <div class="dz-blk"></div>\n              <div class="dz-progress"><div class="dz-upload bg_gradient" data-dz-uploadprogress></div></div>\n            </div>\n          </div>'},dropzoneDragChange:function(){this.dropzoneDrag=!this.dropzoneDrag},dropzoneSending:function(e,t,r){r.append("type","project_img")},dropzoneSuccess:function(e,t){this.dropzoneDrag=!1;var r=this,a=JSON.parse(t);this.project.img=a.id,this.project.imgsrc=a.src,this.$refs.accountImgDropzone.removeFile(e),r.editProject("img")},dropzoneError:function(e,t){console.log("error: "+t)},editProject:function(e){if(!this.create){var t=this.project[e];"hashtags"===e&&(t=this.project.hashtags.join(",")),i.b.request("post","/project/update",{id:this.project.ID,attr:e,val:t},function(e){console.log(e)})}},editProjectMembers:function(e,t){if(!this.create){var r="/project/relation/",a={};"add"===e?(r+="create",a={project_id:this.project.ID,user_id:t,relation:"member"}):(r+="delete",a={project_id:this.project.ID,user_id:t}),i.b.request("post",r,a,function(e){console.log(e)})}},userSearchInput:function(){var e=this;e.userSearchLoading=!0,e.userSearchEmpty=!1,clearTimeout(this.userSearchTimeout),""!==e.userSearchStr&&(this.userSearchTimeout=setTimeout(function(){i.b.request("post","/user/search",{str:e.userSearchStr},function(t){e.userSearchLoading=!1,t.error?(e.userSearch=[],e.userSearchEmpty=!0):e.userSearch=t})},1e3))},userSearchAdd:function(e){for(var t=this.userSearch[e],r=!1,a=0;a<this.project.members.length;a++)t.ID===this.project.members[a].ID&&(r=!0);r||(this.project.members.push(t),this.editProjectMembers("add",t.ID)),this.userSearchStr="",this.userSearchInput()},userSearchRemove:function(e){for(var t=0;t<this.project.members.length;t++)this.project.members[t].ID===e&&(this.editProjectMembers("delete",this.project.members[t].ID),this.project.members.splice(t,1))},submitProject:function(){var e=this;i.b.request("post","/project/create",{project:this.project},function(t){var r=e.profile,a=r.projects.owner;a?a.push(t.ID):a=[t.ID],r.projects.owner=a,e.$emit("profileChange",r),e.$router.push("dashboard")})},deleteProject:function(){this.create||confirm("Are you sure to delete your project?")&&(i.b.request("post","/project/delete",{project_id:this.project.ID},function(e){console.log(e)}),this.$router.push("/dashboard"))}},created:function(){var e=this;if(e.$route.params.project){var t=e.$route.params.project;e.create=!1,i.b.request("get","/project?route="+t,{},function(t){t.error?"project_not_found"===t.error&&(e.notFound=!0):(e.project=t,e.project.imgsrc=t.img),e.projectInit=!0})}}}},"6X/o":function(e,t){},"6sTS":function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"livechat"},[e._v("\n  LIVECHAT\n  "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.msg,expression:"msg"}],attrs:{type:"text"},domProps:{value:e.msg},on:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.submitMsg(t)},input:function(t){t.target.composing||(e.msg=t.target.value)}}}),e._v(" "),r("div",e._l(e.list,function(t){return r("div",[e._v("\n      "+e._s(t)+"\n    ")])}))])},o=[],s={render:a,staticRenderFns:o};t.a=s},"88Th":function(e,t,r){"use strict";function a(e){r("fpTd")}var o=r("bpHe"),s=r("6sTS"),i=r("VU/8"),n=a,c=i(o.a,s.a,!1,n,null,null);t.a=c.exports},"8hNy":function(e,t){},CZOx:function(e,t){},"Cb/k":function(e,t){},Fs8J:function(e,t,r){"use strict";var a=r("CZOx"),o=(r.n(a),r("oGFv"));t.a={name:"Home",props:["profile"],data:function(){return{login:[],register:[],switchBool:!1}},methods:{switchHome:function(){this.switchBool=!this.switchBool},login_submit:function(){var e=this;o.b.request("post","/login",{email:this.login.email,pw:this.login.pw},function(t){t.error?alert("wrong data"):(console.log(t.token),document.cookie="token="+t.token,o.b.request("get","/user",0,function(t){e.$emit("profileChange",t),e.$router.push({path:"dashboard"})}))})},register_submit:function(){var e=this;o.b.request("post","/user/create",{fname:this.register.fname,lname:this.register.lname,email:this.register.email,pw:this.register.pw,factory_nb:this.register.factory_nb},function(t){t.error?"email_used"===t.error?alert("this email was already used for creating an account"):"factory_nb_used"===t.error?alert("this factory number was already used for creating an account"):console.log(t):(e.login.email=e.register.email,e.login.pw=e.register.pw,e.login_submit())})}},created:function(){this.$emit("profileChange",!1)}}},Hu7S:function(e,t){},"I+d5":function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"home page"},[r("transition",{attrs:{name:"page",mode:"out-in"}},[e.switchBool?e._e():r("div",{staticClass:"home_login home_element"},[r("h2",{staticClass:"page_headline"},[e._v("Login")]),e._v(" "),r("form",{attrs:{method:"post",action:"javascript:void(0);"},on:{submit:e.login_submit}},[r("div",{staticClass:"home_element_input input bg_gradient"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.login.email,expression:"login.email"}],staticClass:"home_login_email",attrs:{type:"email",placeholder:"Email"},domProps:{value:e.login.email},on:{input:function(t){t.target.composing||e.$set(e.login,"email",t.target.value)}}})]),e._v(" "),r("div",{staticClass:"home_element_input input bg_gradient"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.login.pw,expression:"login.pw"}],staticClass:"home_login_pw",attrs:{type:"password",placeholder:"password"},domProps:{value:e.login.pw},on:{input:function(t){t.target.composing||e.$set(e.login,"pw",t.target.value)}}})]),e._v(" "),r("p",{staticClass:"home_element_switch",on:{click:e.switchHome}},[e._v("\n          Register now\n        ")]),e._v(" "),r("div",{staticClass:"home_element_button button bg_gradient"},[r("button",{attrs:{type:"submit"}},[e._v("Continue")])])])])]),e._v(" "),r("transition",{attrs:{name:"page",mode:"out-in"}},[e.switchBool?r("div",{staticClass:"home_register home_element"},[r("h2",{staticClass:"page_headline"},[e._v("Registration")]),e._v(" "),r("form",{attrs:{method:"post",action:"javascript:void(0);"},on:{submit:e.register_submit}},[r("div",{staticClass:"home_element_input input half bg_gradient"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.register.fname,expression:"register.fname"}],staticClass:"home_login_pw",attrs:{type:"text",placeholder:"Surname"},domProps:{value:e.register.fname},on:{input:function(t){t.target.composing||e.$set(e.register,"fname",t.target.value)}}})]),e._v(" "),r("div",{staticClass:"home_element_input input half bg_gradient"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.register.lname,expression:"register.lname"}],staticClass:"home_login_pw",attrs:{type:"text",placeholder:"Last name"},domProps:{value:e.register.lname},on:{input:function(t){t.target.composing||e.$set(e.register,"lname",t.target.value)}}})]),e._v(" "),r("div",{staticClass:"home_element_input input bg_gradient"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.register.email,expression:"register.email"}],staticClass:"home_login_pw",attrs:{type:"email",placeholder:"email"},domProps:{value:e.register.email},on:{input:function(t){t.target.composing||e.$set(e.register,"email",t.target.value)}}})]),e._v(" "),r("div",{staticClass:"home_element_input input bg_gradient"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.register.pw,expression:"register.pw"}],staticClass:"home_login_pw",attrs:{type:"password",placeholder:"password"},domProps:{value:e.register.pw},on:{input:function(t){t.target.composing||e.$set(e.register,"pw",t.target.value)}}})]),e._v(" "),r("div",{staticClass:"home_element_input input bg_gradient"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.register.factory_nb,expression:"register.factory_nb"}],staticClass:"home_login_pw",attrs:{type:"text",placeholder:"factory number"},domProps:{value:e.register.factory_nb},on:{input:function(t){t.target.composing||e.$set(e.register,"factory_nb",t.target.value)}}})]),e._v(" "),r("p",{staticClass:"home_element_switch",on:{click:e.switchHome}},[e._v("\n          already registered\n        ")]),e._v(" "),r("div",{staticClass:"home_element_button button bg_gradient"},[r("button",{attrs:{type:"submit"}},[e._v("Register")])])])]):e._e()])],1)},o=[],s={render:a,staticRenderFns:o};t.a=s},KkAg:function(e,t,r){"use strict";var a=r("c3y4"),o=r.n(a),s=r("oGFv");t.a={name:"projects",components:{visual:o.a},props:["profile","projects","fullscreen","add"],data:function(){return{button:!1}},methods:{getListButton:function(e){return s.a.getButton(this.profile.projects,e)},likeButton:function(e){this.profile.projects.liked=s.a.likeButton(this.profile,e),this.$emit("unlike",e)}}}},M93x:function(e,t,r){"use strict";var a=r("xJD8"),o=r("yzSJ"),s=r("VU/8"),i=s(a.a,o.a,!1,null,null,null);t.a=i.exports},NHnr:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("7+uW"),o=r("M93x"),s=r("YaEn"),i=r("6X/o");r.n(i);a.default.config.productionTip=!1,new a.default({el:"#app",router:s.a,template:"<App/>",components:{App:o.a}})},NJct:function(e,t,r){"use strict";var a=r("2EDS"),o=r("gPbQ"),s=r("VU/8"),i=s(a.a,o.a,!1,null,null,null);t.a=i.exports},PcHo:function(e,t,r){"use strict";var a=r("ihHF"),o=(r.n(a),r("mib0")),s=(r.n(o),r("c3y4")),i=r.n(s),n=r("gtnv"),c=r("oGFv");t.a={name:"Projects",components:{visual:i.a,projects:n.a},props:["profile"],data:function(){return{availableProjects:[],availableProjectsInit:!1}},created:function(){document.cookie="projectPageBack=projects";var e=this;c.b.request("get","/project/list",{},function(t){e.availableProjects=t,e.availableProjectsInit=!0})}}},QzI7:function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"projects_list",class:{fullscreen:e.fullscreen}},[e._l(e.projects,function(t,a){return r("div",{staticClass:"projects_elem"},[r("div",{staticClass:"projects_elem_head"},[r("router-link",{attrs:{to:"/projects/"+t.route}},[r("div",{staticClass:"projects_elem_img_wrapper"},[r("visual",{staticClass:"projects_elem_img",attrs:{image:t.img,background:"cover"}})],1)]),e._v(" "),r("router-link",{attrs:{to:"/projects/"+t.route+"/edit"}},["edit"==e.getListButton(t.ID)?r("div",{staticClass:"projects_elem_button projects_elem_button_edit"},[r("i",{staticClass:"fa fa-pencil",attrs:{"aria-hidden":"true"}})]):e._e()]),e._v(" "),"like"==e.getListButton(t.ID)||"liked"==e.getListButton(t.ID)?r("div",{staticClass:"projects_elem_button projects_elem_button_like",class:{bg_gradient:"liked"==e.getListButton(t.ID)},on:{click:function(r){e.likeButton(t.ID)}}},[r("i",{staticClass:"fa fa-heart-o",attrs:{"aria-hidden":"true"}})]):e._e(),e._v(" "),"member"==e.getListButton(t.ID)?r("div",{staticClass:"projects_elem_button projects_elem_button_like bg_gradient"},[r("i",{staticClass:"fa fa-user",attrs:{"aria-hidden":"true"}})]):e._e()],1),e._v(" "),r("div",{staticClass:"projects_elem_body"},[r("p",{staticClass:"projects_elem_hashtags"},e._l(t.hashtags,function(t){return r("span",[e._v("#"+e._s(t))])})),e._v(" "),r("p",{staticClass:"projects_elem_name"},[e._v("\n        "+e._s(t.name)+"\n      ")]),e._v(" "),r("p",{staticClass:"projects_elem_descr"},[e._v("\n        "+e._s(t.short_descr)+"\n      ")])])])}),e.add?r("div",{staticClass:"projects_elem add"},[r("router-link",{attrs:{to:"/create"}},[r("div",{staticClass:"projects_elem_head"},[r("div",{staticClass:"projects_elem_img_wrapper"},[r("i",{staticClass:"fa fa-plus",attrs:{"aria-hidden":"true"}})])])])],1):e._e()],2)},o=[],s={render:a,staticRenderFns:o};t.a=s},TGvd:function(e,t,r){"use strict";function a(e){r("0X56")}var o=r("aEfQ"),s=r("vq/B"),i=r("VU/8"),n=a,c=i(o.a,s.a,!1,n,null,null);t.a=c.exports},"V/xi":function(e,t,r){"use strict";var a=r("6IFl"),o=r("pXt2"),s=r("VU/8"),i=s(a.a,o.a,!1,null,null,null);t.a=i.exports},VUtf:function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"account page"},[r("h2",{staticClass:"page_headline"},[e._v("Edit account")]),e._v(" "),r("div",{staticClass:"account_general"},[r("div",{staticClass:"input half bg_gradient"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.profile.fname,expression:"profile.fname"}],attrs:{type:"text",placeholder:"Prename"},domProps:{value:e.profile.fname},on:{change:function(t){e.editProfile("fname")},input:function(t){t.target.composing||e.$set(e.profile,"fname",t.target.value)}}})]),e._v(" "),r("div",{staticClass:"input half bg_gradient"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.profile.lname,expression:"profile.lname"}],attrs:{type:"text",placeholder:"Lastname"},domProps:{value:e.profile.lname},on:{change:function(t){e.editProfile("lname")},input:function(t){t.target.composing||e.$set(e.profile,"lname",t.target.value)}}})]),e._v(" "),r("div",{staticClass:"clear"}),e._v(" "),r("div",{staticClass:"input bg_gradient"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.profile.email,expression:"profile.email"}],attrs:{type:"email",placeholder:"Email",readonly:""},domProps:{value:e.profile.email},on:{input:function(t){t.target.composing||e.$set(e.profile,"email",t.target.value)}}})])]),e._v(" "),r("div",{staticClass:"account_img"},[r("div",{staticClass:"account_img_dropzone dropzone",class:{drag:e.dropzoneDrag,empty:0==e.profile.img}},[r("div",{staticClass:"dropzone_content"},[r("dropzone",{ref:"accountImgDropzone",staticClass:"dropzone_content_elem",attrs:{id:"account_img_dropzone",options:e.dropzoneOptions,"include-styling":!1},on:{"vdropzone-drag-enter":e.dropzoneDragChange,"vdropzone-drag-leave":e.dropzoneDragChange,"vdropzone-sending":e.dropzoneSending,"vdropzone-success":e.dropzoneSuccess,"vdropzone-error":e.dropzoneError}})],1),e._v(" "),r("div",{staticClass:"dropzone_hover"},[r("div",{staticClass:"dropzone_hover_msg"},[0!=e.profile.img?r("span",[e._v("change picture")]):e._e(),e._v(" "),0==e.profile.img?r("span",[e._v("add picture")]):e._e()])])]),e._v(" "),r("div",{staticClass:"account_img_content"},[0!=e.profile.img?r("img",{attrs:{src:e.profile.img}}):e._e()])]),e._v(" "),r("div",{staticClass:"account_button"},[r("router-link",{attrs:{to:"dashboard"}},[r("div",{staticClass:"account_button_dashboard button bg_gradient"},[r("button",[e._v("Dashboard")])])]),e._v(" "),e._m(0)],1)])},o=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"account_button_delete button"},[r("button",[e._v("Delete account")])])}],s={render:a,staticRenderFns:o};t.a=s},YaEn:function(e,t,r){"use strict";var a=r("7+uW"),o=r("/ocq"),s=r("lO7g"),i=r("TGvd"),n=r("uwSr"),c=r("NJct"),l=r("V/xi"),p=r("uK6g"),u=r("88Th");a.default.use(o.a),t.a=new o.a({mode:"history",routes:[{path:"/",name:"Home",component:s.a},{path:"/dashboard",name:"Dashboard",component:i.a},{path:"/projects",name:"Projects",component:n.a},{path:"/projects/:project",name:"ProjectPage",component:c.a},{path:"/projects/:project/edit",name:"ProjectEdit",component:l.a},{path:"/create",name:"ProjectCreate",component:l.a},{path:"/account",name:"Account",component:p.a},{path:"/livechat",name:"Livechat",component:u.a}]})},YmjD:function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"nav"},[r("transition",{attrs:{name:"page"}},[e.profile?r("div",{staticClass:"nav_profile"},[r("router-link",{attrs:{to:"/account"}},[r("div",{staticClass:"nav_profile_img nav_profile_elem bg_gradient"},[0!=e.profile.img?r("img",{staticClass:"border_gradient",attrs:{src:e.profile.img}}):e._e(),e._v(" "),0==e.profile.img?r("div",{staticClass:"nav_profile_img_icon"},[r("i",{staticClass:"fa fa-user",attrs:{"aria-hidden":"true"}})]):e._e()])]),e._v(" "),r("div",{staticClass:"nav_profile_menu",class:{active:e.navProfileMenu}},[r("div",{staticClass:"nav_profile_menu_triangle nav_profile_elem",on:{click:e.navProfileMenuChange}},[r("img",{staticClass:"nav_profile_menu_triangle_img",attrs:{src:"/static/media/triangle.png"}})]),e._v(" "),r("div",{staticClass:"nav_profile_menu_content bg_gradient"},[r("div",{staticClass:"nav_profile_menu_content_inner"},[r("router-link",{attrs:{to:"account"}},[r("p",{staticClass:"nav_profile_menu_content_element",on:{click:e.navProfileMenuChange}},[e._v("Edit account")])]),e._v(" "),r("router-link",{attrs:{to:"/"}},[r("p",{staticClass:"nav_profile_menu_content_element",on:{click:e.logout}},[e._v("Log out")])])],1)])]),e._v(" "),r("router-link",{attrs:{to:"/dashboard"}},[r("div",{staticClass:"nav_profile_text nav_text nav_profile_elem",class:{active:"Dashboard"==e.$route.name}},[e._v("\n          DASHBOARD\n        ")])]),e._v(" "),r("div",{staticClass:"clear"})],1):e._e()]),e._v(" "),e._m(0),e._v(" "),r("transition",{attrs:{name:"page"}},[e.profile?r("div",{staticClass:"nav_project"},[r("router-link",{attrs:{to:"/projects"}},[r("div",{staticClass:"nav_project_text nav_text nav_project_elem",class:{active:"Projects"==e.$route.name}},[r("span",[e._v("ALL PROJECTS")])])]),e._v(" "),r("div",{staticClass:"clear"})],1):e._e()])],1)},o=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"nav_logo"},[r("img",{staticClass:"nav_logo_img",attrs:{src:"/static/media/logo.png"}})])}],s={render:a,staticRenderFns:o};t.a=s},aEfQ:function(e,t,r){"use strict";var a=r("0h8N"),o=(r.n(a),r("gtnv")),s=r("oGFv");t.a={name:"Dashboard",props:["profile"],components:{projects:o.a},data:function(){return{ownProjects:[],ownProjectsInit:!1,likedProjects:[],likedProjectsInit:!1,projectPage:!1,projectPageButton:0}},methods:{ownProjectsLoad:function(){var e=this,t="/project/list?user_id="+this.profile.ID+"&relation=owner,member";s.b.request("get",t,{},function(t){e.ownProjects=t,e.ownProjectsInit=!0})},likedProjectsLoad:function(){var e=this,t="/project/list?user_id="+this.profile.ID+"&relation=liked";s.b.request("get",t,{},function(t){e.likedProjects=t,e.likedProjectsInit=!0})},unlikeProject:function(e){for(var t=0;t<this.likedProjects.length;t++)this.likedProjects[t].ID===e&&this.likedProjects.splice(t,1)}},created:function(){document.cookie="projectPageBack=dashboard",this.ownProjectsLoad(),this.likedProjectsLoad()}}},"bVQ/":function(e,t,r){"use strict";t.a={name:"navigation",data:function(){return{navProfileMenu:!1}},props:["profile"],methods:{navProfileMenuChange:function(){this.navProfileMenu=!this.navProfileMenu},logout:function(){document.cookie="token=",this.navProfileMenuChange()}}}},bpHe:function(e,t,r){"use strict";var a=r("Sazm"),o=r.n(a),s=o.a.initializeApp({apiKey:"AIzaSyDXm16fJWrXyMN6Em0G-vapleYwzx3bgS0",authDomain:"livechat-494cd.firebaseapp.com",databaseURL:"https://livechat-494cd.firebaseio.com",projectId:"livechat-494cd",storageBucket:"livechat-494cd.appspot.com",messagingSenderId:"217103570681"}),i=s.database();t.a={name:"Livechat",data:function(){return{msg:"",list:[]}},methods:{receiveMsg:function(){var e,t=this;e=i.ref("msg").limitToLast(1),e.on("child_added",function(e){t.list.push(e.val().content)})},initMsg:function(){var e=this;i.ref("msg").once("value",function(t){t.forEach(function(t){e.list.push(t.val().content)})}),e.list.pop(),this.receiveMsg()},submitMsg:function(){var e=this;i.ref("msg").push().set({content:e.msg}),e.msg=""}},created:function(){this.initMsg()}}},bwGm:function(e,t,r){"use strict";var a=r("bVQ/"),o=r("YmjD"),s=r("VU/8"),i=s(a.a,o.a,!1,null,null,null);t.a=i.exports},fpTd:function(e,t){},gPbQ:function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"projectpage page"},[r("div",{staticClass:"projectpage_close"},[r("router-link",{attrs:{to:e.projectPageBack}},[r("img",{attrs:{src:"/static/media/close.png"}})])],1),e._v(" "),r("transition",{attrs:{name:"page"}},[e.notFound?r("h2",{staticClass:"page_headline"},[e._v("project not found")]):e._e()]),e._v(" "),r("transition",{attrs:{name:"page"}},[e.notFound?e._e():r("div",{directives:[{name:"show",rawName:"v-show",value:e.projectInit,expression:"projectInit"}],staticClass:"projectpage_inner"},[r("div",{staticClass:"projects_elem_head"},[r("div",{staticClass:"projects_elem_img_wrapper"},[r("visual",{staticClass:"projects_elem_img",attrs:{image:e.project.img,background:"cover"}})],1),e._v(" "),r("router-link",{attrs:{to:"/projects/"+e.$route.params.project+"/edit"}},["edit"==e.getButton()?r("div",{staticClass:"projects_elem_button projects_elem_button_edit"},[r("i",{staticClass:"fa fa-pencil",attrs:{"aria-hidden":"true"}})]):e._e()]),e._v(" "),"like"==e.getButton()||"liked"==e.getButton()?r("div",{staticClass:"projects_elem_button projects_elem_button_like",class:{bg_gradient:"liked"==e.getButton()},on:{click:e.likeButton}},[r("i",{staticClass:"fa fa-heart-o",attrs:{"aria-hidden":"true"}})]):e._e()],1),e._v(" "),r("div",{staticClass:"projects_elem_body"},[r("p",{staticClass:"projects_elem_hashtags"},e._l(e.project.hashtags,function(t){return r("span",[e._v("#"+e._s(t))])})),e._v(" "),r("p",{staticClass:"projects_elem_name"},[e._v("\n          "+e._s(e.project.name)+"\n        ")]),e._v(" "),r("p",{staticClass:"projects_elem_descr"},[e._v("\n          "+e._s(e.project.short_descr)+"\n        ")]),e._v(" "),r("p",{staticClass:"projectpage_descr"},[e._v("\n          "+e._s(e.project.descr)+"\n        ")]),e._v(" "),r("p",{staticClass:"projectpage_contact"},[e._v("\n          for team meetings contact: "),r("a",{attrs:{href:"mailto:"+e.project.owner.email}},[e._v(e._s(e.project.owner.email))])]),e._v(" "),r("div",{staticClass:"projectpage_members"},[r("div",{staticClass:"project_member owner"},[r("div",{staticClass:"project_member_img bg_gradient"},[r("img",{attrs:{src:e.project.owner.img}})]),e._v(" "),r("p",{staticClass:"project_member_text"},[e._v(e._s(e.project.owner.fname))])]),e._v(" "),e._l(e.project.members,function(t){return r("div",{staticClass:"project_member"},[r("div",{staticClass:"project_member_img bg_gradient"},[r("img",{attrs:{src:t.img}})]),e._v(" "),r("p",{staticClass:"project_member_text"},[e._v(e._s(t.fname))])])})],2)])])])],1)},o=[],s={render:a,staticRenderFns:o};t.a=s},gtnv:function(e,t,r){"use strict";var a=r("KkAg"),o=r("QzI7"),s=r("VU/8"),i=s(a.a,o.a,!1,null,null,null);t.a=i.exports},ihHF:function(e,t){},lD3t:function(e,t){},lO7g:function(e,t,r){"use strict";function a(e){r("Cb/k")}var o=r("Fs8J"),s=r("I+d5"),i=r("VU/8"),n=a,c=i(o.a,s.a,!1,n,null,null);t.a=c.exports},ldqK:function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"projects page"},[r("transition",{attrs:{name:"page",mode:"out-in"}},[r("div",{directives:[{name:"show",rawName:"v-show",value:e.availableProjectsInit,expression:"availableProjectsInit"}],staticClass:"projects_list"},[r("h2",{staticClass:"page_headline"},[e._v("Available Projects")]),e._v(" "),r("projects",{attrs:{projects:e.availableProjects,profile:e.profile,fullscreen:!0}})],1)])],1)},o=[],s={render:a,staticRenderFns:o};t.a=s},mib0:function(e,t){},oGFv:function(e,t,r){"use strict";r.d(t,"a",function(){return l}),r.d(t,"b",function(){return p});var a=r("Zrlr"),o=r.n(a),s=r("wxAW"),i=r.n(s),n=r("mtWM"),c=r.n(n),l=function(){function e(){o()(this,e)}return i()(e,null,[{key:"getCookie",value:function(e){for(var t=e+"=",r=document.cookie.split(";"),a=0;a<r.length;a++){for(var o=r[a];" "===o.charAt(0);)o=o.substring(1);if(0===o.indexOf(t))return o.substring(t.length,o.length)}return!1}},{key:"getButton",value:function(e,t){for(var r=["owner","member","liked"],a="like",o=0;o<r.length;o++)if(e[r[o]])for(var s=0;s<e[r[o]].length;s++)t===e[r[o]][s]&&("owner"===r[o]?a="edit":"member"===r[o]?a="member":"liked"===r[o]&&(a="liked"));return a}},{key:"likeButton",value:function(e,t){var r=!1,a=e.projects.liked;if(a)for(var o=0;o<a.length;o++)a[o]===t&&(r=!0,a.splice(o,1));return r?p.request("post","/project/relation/delete",{project_id:t,user_id:e.ID},function(e){console.log(e)}):(a?a.push(t):a=[t],p.request("post","/project/relation/create",{project_id:t,user_id:e.ID,relation:"liked"},function(e){console.log(e)})),a}}]),e}(),p=function(){function e(){o()(this,e)}return i()(e,null,[{key:"request",value:function(e,t,r,a){var o=c.a.create({baseURL:"https://projectf-api.ttrks.de"}),s={headers:{Accept:"application/json"}},i=l.getCookie("token");i&&(s.headers.Authorization=i),"get"===e&&o.get(t,s).then(function(e){a(e.data)}).catch(function(e){console.log("error: "+e)}),"post"===e&&o.post(t,r,s).then(function(e){a(e.data)}).catch(function(e){console.log("error: "+e)})}}]),e}()},pXt2:function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"projectcreate page"},[r("h2",{staticClass:"page_headline"},[e.create?r("span",[e._v("Set up a new project")]):e._e(),e._v(" "),e.create?e._e():r("span",[e._v("Edit your project")])]),e._v(" "),r("transition",{attrs:{name:"page"}},[r("div",{directives:[{name:"show",rawName:"v-show",value:e.projectInit||e.create,expression:"projectInit || create"}],staticClass:"projectcreate_inner"},[r("div",{staticClass:"input bg_gradient"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.project.name,expression:"project.name"}],attrs:{type:"text",placeholder:"Project name"},domProps:{value:e.project.name},on:{change:function(t){e.editProject("name")},input:function(t){t.target.composing||e.$set(e.project,"name",t.target.value)}}})]),e._v(" "),r("div",{staticClass:"projectcreate_img"},[r("div",{staticClass:"projectcreate_img_dropzone dropzone",class:{drag:e.dropzoneDrag,empty:0==e.project.img}},[r("div",{staticClass:"dropzone_content"},[r("dropzone",{ref:"accountImgDropzone",staticClass:"dropzone_content_elem",attrs:{id:"projectcreate_img_dropzone",options:e.dropzoneOptions,"include-styling":!1},on:{"vdropzone-drag-enter":e.dropzoneDragChange,"vdropzone-drag-leave":e.dropzoneDragChange,"vdropzone-sending":e.dropzoneSending,"vdropzone-success":e.dropzoneSuccess,"vdropzone-error":e.dropzoneError}})],1),e._v(" "),r("div",{staticClass:"dropzone_hover"},[r("div",{staticClass:"dropzone_hover_msg"},[0!=e.project.img?r("span",[e._v("change project image")]):e._e(),e._v(" "),0==e.project.img?r("span",[e._v("add project image")]):e._e()])])]),e._v(" "),r("div",{staticClass:"projectcreate_img_content"},[0!=e.project.img?r("visual",{staticClass:"projectcreate_img_content_visual",attrs:{image:e.project.imgsrc,background:"cover"}}):e._e()],1)]),e._v(" "),r("div",{staticClass:"projectcreate_descr"},[r("div",{staticClass:"projectcreate_descr_elem short bg_gradient input"},[r("textarea",{directives:[{name:"model",rawName:"v-model",value:e.project.short_descr,expression:"project.short_descr"}],attrs:{placeholder:"short description for list view"},domProps:{value:e.project.short_descr},on:{change:function(t){e.editProject("short_descr")},input:function(t){t.target.composing||e.$set(e.project,"short_descr",t.target.value)}}})]),e._v(" "),r("div",{staticClass:"projectcreate_descr_elem bg_gradient input"},[r("textarea",{directives:[{name:"model",rawName:"v-model",value:e.project.descr,expression:"project.descr"}],attrs:{placeholder:"long description for project page"},domProps:{value:e.project.descr},on:{change:function(t){e.editProject("descr")},input:function(t){t.target.composing||e.$set(e.project,"descr",t.target.value)}}})])]),e._v(" "),r("h3",{staticClass:"projectcreate_subheadline"},[e._v("Project-Hashtags")]),e._v(" "),r("div",{staticClass:"projectcreate_hashtag"},[e._l(e.project.hashtags,function(t,a){return r("div",{staticClass:"input third bg_gradient"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.project.hashtags[a],expression:"project.hashtags[index]"}],attrs:{type:"text",placeholder:"#"+(parseInt(a)+1)},domProps:{value:e.project.hashtags[a]},on:{change:function(t){e.editProject("hashtags")},input:function(t){t.target.composing||e.$set(e.project.hashtags,a,t.target.value)}}})])}),e._v(" "),r("div",{staticClass:"clear"})],2),e._v(" "),r("h3",{staticClass:"projectcreate_subheadline"},[e._v("Team")]),e._v(" "),r("div",{staticClass:"projectcreate_team bg_gradient"},[r("div",{staticClass:"projectcreate_team_inner"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.userSearchStr,expression:"userSearchStr"}],staticClass:"projectcreate_team_search",attrs:{type:"text",placeholder:"Add people"},domProps:{value:e.userSearchStr},on:{input:[function(t){t.target.composing||(e.userSearchStr=t.target.value)},e.userSearchInput]}}),e._v(" "),""!=e.userSearchStr?r("div",{staticClass:"projectcreate_team_add"},[e.userSearchLoading||e.userSearchEmpty?e._e():r("p",{staticClass:"projectcreate_team_add_headline"},[e._v("choose people to add them")]),e._v(" "),e._l(e.userSearch,function(t,a){return e.userSearchLoading?e._e():r("div",{staticClass:"project_member",on:{click:function(t){e.userSearchAdd(a)}}},[r("div",{staticClass:"project_member_img bg_gradient"},[r("img",{attrs:{src:t.img}})]),e._v(" "),r("p",{staticClass:"project_member_text"},[e._v(e._s(t.fname))])])}),e._v(" "),e.userSearchLoading?r("div",{staticClass:"projectcreate_team_add_status projectcreate_team_add_loading"},[e._v("Loading")]):e._e(),e._v(" "),e.userSearchEmpty?r("div",{staticClass:"projectcreate_team_add_status projectcreate_team_add_no_results"},[e._v("no results")]):e._e()],2):e._e(),e._v(" "),""==e.userSearchStr?r("div",{staticClass:"projectcreate_team_content"},[e._l(e.project.members,function(t){return r("div",{staticClass:"project_member"},[r("div",{staticClass:"project_member_img bg_gradient"},[r("img",{attrs:{src:t.img}}),e._v(" "),r("div",{staticClass:"project_member_img_hover",on:{click:function(r){e.userSearchRemove(t.ID)}}},[r("i",{staticClass:"fa fa-trash",attrs:{"aria-hidden":"true"}})])]),e._v(" "),r("p",{staticClass:"project_member_text"},[e._v(e._s(t.fname))])])}),e._v(" "),r("div",{staticClass:"clear"}),e._v(" "),0==e.project.members.length?r("div",{staticClass:"projectcreate_team_content_empty"},[r("span",[e._v("add some more people who are working with you")])]):e._e()],2):e._e()])]),e._v(" "),r("div",{staticClass:"projectcreate_buttons"},[e.create?e._e():r("div",{staticClass:"projectcreate_delete button"},[r("button",{on:{click:e.deleteProject}},[e._v("Delete Project")])]),e._v(" "),r("div",{staticClass:"projectcreate_submit button bg_gradient"},[e.create?r("button",{on:{click:e.submitProject}},[e._v("Create Project")]):e._e(),e._v(" "),e.create?e._e():r("router-link",{attrs:{to:"/projects/"+e.$route.params.project}},[r("button",[e._v("Close")])])],1)])])])],1)},o=[],s={render:a,staticRenderFns:o};t.a=s},qDI4:function(e,t,r){"use strict";var a=r("lD3t"),o=(r.n(a),r("KvPw")),s=r.n(o),i=r("oGFv");t.a={name:"Account",components:{dropzone:s.a},props:["profile"],data:function(){return{dropzoneOptions:{url:"https://projectf-api.ttrks.de/media/upload",headers:{Accept:"application/json",Authorization:i.a.getCookie("token")},thumbnailWidth:200,thumbnailHeight:200,maxFilesize:4,acceptedFiles:"image/*",previewTemplate:this.dropzoneTemp()},dropzoneDrag:!1}},methods:{dropzoneTemp:function(){return'<div class="dz-preview dz-file-preview">\n              <div class="dz-details">\n                <img data-dz-thumbnail />\n              </div>\n              <div class="dz-blk"></div>\n              <div class="dz-progress"><div class="dz-upload bg_gradient" data-dz-uploadprogress></div></div>\n            </div>\n          </div>'},dropzoneDragChange:function(){this.dropzoneDrag=!this.dropzoneDrag},dropzoneSending:function(e,t,r){r.append("type","user_img")},dropzoneSuccess:function(e,t){this.dropzoneDrag=!1;var r=JSON.parse(t);this.profile.img=r.src,this.$refs.accountImgDropzone.removeFile(e),i.b.request("post","/user/update",{attr:"img",val:r.id},function(e){console.log(e)})},dropzoneError:function(e,t){console.log("error: "+t)},editProfile:function(e){var t=this;i.b.request("post","/user/update",{attr:e,val:t.profile[e]},function(e){console.log(e)})}},created:function(){}}},qiVM:function(e,t){},uK6g:function(e,t,r){"use strict";var a=r("qDI4"),o=r("VUtf"),s=r("VU/8"),i=s(a.a,o.a,!1,null,null,null);t.a=i.exports},uwSr:function(e,t,r){"use strict";function a(e){r("Hu7S")}var o=r("PcHo"),s=r("ldqK"),i=r("VU/8"),n=a,c=i(o.a,s.a,!1,n,null,null);t.a=c.exports},"vq/B":function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"dashboard page"},[r("transition",{attrs:{name:"page",mode:"out-in"}},[r("div",{directives:[{name:"show",rawName:"v-show",value:e.ownProjectsInit&&e.likedProjectsInit,expression:"ownProjectsInit && likedProjectsInit"}],staticClass:"dashboard_inner"},[r("div",{staticClass:"dashboard_row"},[r("h2",{staticClass:"page_headline"},[e._v("\n          Your Projects\n        ")]),e._v(" "),r("div",{staticClass:"dashboard_project"},[r("projects",{attrs:{projects:e.ownProjects,profile:e.profile,fullscreen:!1,add:!0}})],1)]),r("div",{staticClass:"dashboard_row"},[r("h2",{staticClass:"page_headline"},[e._v("\n          Liked Projects\n        ")]),e._v(" "),r("div",{staticClass:"dashboard_project"},[r("transition",{attrs:{name:"page",mode:"out-in"}},[e.likedProjects.length>0?r("projects",{attrs:{projects:e.likedProjects,profile:e.profile,fullscreen:!1},on:{unlike:e.unlikeProject}}):e._e(),e._v(" "),0==e.likedProjects.length?r("div",{staticClass:"dashboard_project_empty"},[e._v("\n              you did not liked any projects yet! "),r("router-link",{attrs:{to:"/projects"}},[e._v("browse now")])],1):e._e()],1)],1)])])])],1)},o=[],s={render:a,staticRenderFns:o};t.a=s},xJD8:function(e,t,r){"use strict";var a=r("bwGm"),o=r("oGFv");t.a={name:"app",components:{navigation:a.a},data:function(){return{profile:!1,profileInit:!1}},methods:{profileChange:function(e){this.profile=e}},created:function(){var e=this;console.log(o.a.getCookie("token")),o.a.getCookie("token")?o.b.request("get","/user",0,function(t){t.error?"register_first"===t.error&&e.$router.push("/"):(e.profileChange(t),"Home"===e.$route.name&&e.$router.push("/dashboard")),e.profileInit=!0}):(this.profile=!1,"Home"!==this.$route.name&&this.$router.push("/"),e.profileInit=!0)}}},yzSJ:function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("navigation",{attrs:{profile:e.profile}}),e._v(" "),r("transition",{attrs:{name:"page",mode:"out-in",appear:""}},[e.profileInit?r("router-view",{key:e.$route.fullPath,attrs:{profile:e.profile},on:{profileChange:e.profileChange}}):e._e()],1)],1)},o=[],s={render:a,staticRenderFns:o};t.a=s}},["NHnr"]);
//# sourceMappingURL=app.c0ebfbfd6f6b5a550f6e.js.map