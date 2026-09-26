import * as THREE from 'three';
export function createMachine(container,onPress){
 const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(33,1,.1,100);camera.position.set(0,2.9,10.8);camera.lookAt(0,1.8,0);
 const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.setClearColor(0,0);container.append(renderer.domElement);renderer.domElement.setAttribute('aria-hidden','true');const hitButton=container.querySelector('#spin');const buttonPosition=new THREE.Vector3();const edgePosition=new THREE.Vector3();
 scene.add(new THREE.HemisphereLight(0xfffbe8,0x91a4c3,2.5));const light=new THREE.DirectionalLight(0xfff7dc,4);light.position.set(-3,7,6);light.castShadow=true;light.shadow.mapSize.set(1024,1024);scene.add(light);const fill=new THREE.DirectionalLight(0xbddcff,2);fill.position.set(4,3,-3);scene.add(fill);
 const cat=new THREE.Group();cat.rotation.y=-.16;scene.add(cat);
 const mat=(color,extra={})=>new THREE.MeshPhysicalMaterial({color,roughness:.3,metalness:.08,flatShading:true,...extra});
 const blue=mat(0xa7c6df),pale=mat(0xd7e9eb),pink=mat(0xefadbd),dark=mat(0x414d64),yellow=mat(0xf0d878),glass=mat(0xb6dcf0,{transparent:true,opacity:.24,roughness:.08,depthWrite:false,side:THREE.DoubleSide});
 function mesh(geo,material,pos,parent=cat){const m=new THREE.Mesh(geo,material);m.position.set(...pos);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
 const sphere=(r,material,pos,parent=cat,w=12,h=8)=>mesh(new THREE.SphereGeometry(r,w,h),material,pos,parent);
 const cylinder=(rt,rb,height,material,pos,parent=cat)=>mesh(new THREE.CylinderGeometry(rt,rb,height,12),material,pos,parent);
 cylinder(1.13,1.22,.22,blue,[0,.16,0]);cylinder(.82,1.02,1.05,blue,[0,.78,0]);cylinder(.94,.88,.13,pale,[0,1.35,0]);
 const head=sphere(1.22,glass,[0,2.43,0]);head.scale.set(1.07,.93,.84);
 // Faceted ears, inset blush triangles, and the transparent cat globe.
 function ear(x,rot){const outer=mesh(new THREE.ConeGeometry(.51,1.03,3),pale,[x,3.47,-.03]);outer.rotation.z=rot;outer.rotation.y=Math.PI;outer.scale.z=.55;const inner=mesh(new THREE.ConeGeometry(.31,.67,3),pink,[x,3.51,.17]);inner.rotation.z=rot;inner.rotation.y=Math.PI;inner.scale.z=.22;}
 ear(-.91,.31);ear(.91,-.31);
 for(const x of [-.69,.69]){const paw=sphere(.37,pale,[x,.22,.68]);paw.scale.set(1.1,.55,1.2);for(let n=-1;n<=1;n++){const line=mesh(new THREE.BoxGeometry(.016,.09,.025),blue,[x+n*.095,.24,1.08]);line.rotation.x=.4;}}
 const tailCurve=new THREE.CatmullRomCurve3([new THREE.Vector3(.8,.55,-.25),new THREE.Vector3(1.45,.6,-.35),new THREE.Vector3(1.65,1.1,-.2),new THREE.Vector3(1.45,1.45,-.05)]);mesh(new THREE.TubeGeometry(tailCurve,10,.13,6,false),blue,[0,0,0]);
 // Printed facial details follow the front of the globe.
 function starShape(){const s=new THREE.Shape();for(let i=0;i<10;i++){const a=i*Math.PI/5+Math.PI/2,r=i%2?.12:.26;const x=Math.cos(a)*r,y=Math.sin(a)*r;i?s.lineTo(x,y):s.moveTo(x,y);}s.closePath();return s;}
 mesh(new THREE.ShapeGeometry(starShape()),dark,[-.48,2.62,.96]);const eye=sphere(.115,dark,[.49,2.62,.965],cat,8,6);eye.scale.z=.25;
 for(const x of [-.77,.77]){const cheek=sphere(.19,pink,[x,2.35,.82]);cheek.scale.set(1,.48,.1);}
 const mouthCurve=new THREE.CatmullRomCurve3([new THREE.Vector3(-.23,2.35,1.02),new THREE.Vector3(-.17,2.24,1.03),new THREE.Vector3(-.06,2.25,1.04),new THREE.Vector3(0,2.32,1.04),new THREE.Vector3(.06,2.25,1.04),new THREE.Vector3(.17,2.24,1.03),new THREE.Vector3(.23,2.35,1.02)]);mesh(new THREE.TubeGeometry(mouthCurve,18,.025,5,false),dark,[0,0,0]);
 // A little label and red pressable button on the body.
 const labelCanvas=document.createElement('canvas');labelCanvas.width=256;labelCanvas.height=80;const ctx=labelCanvas.getContext('2d');ctx.fillStyle='#f8f3d8';ctx.fillRect(0,0,256,80);ctx.fillStyle='#63768d';ctx.font='bold 24px monospace';ctx.textAlign='center';ctx.fillText('LITTLE GOOD',128,48);const texture=new THREE.CanvasTexture(labelCanvas);texture.magFilter=THREE.NearestFilter;mesh(new THREE.PlaneGeometry(.92,.28),new THREE.MeshBasicMaterial({map:texture}),[0,1.15,.87]);
 const buttonRing=cylinder(.35,.35,.1,yellow,[0,.77,.97]);buttonRing.rotation.x=Math.PI/2;const red=mat(0xe67774,{emissive:0xd54d42,emissiveIntensity:.12});const button=cylinder(.28,.28,.16,red,[0,.77,1.06]);button.rotation.x=Math.PI/2;
 const chute=mesh(new THREE.BoxGeometry(.64,.3,.2),dark,[0,.36,.96]);const lip=mesh(new THREE.BoxGeometry(.76,.09,.4),pale,[0,.2,1.04]);
 const crank=new THREE.Group();crank.position.set(1.02,1.07,0);cat.add(crank);const axle=cylinder(.14,.14,.36,yellow,[.1,0,0],crank);axle.rotation.z=Math.PI/2;mesh(new THREE.BoxGeometry(.12,.46,.12),pale,[.28,-.17,0],crank);const handle=cylinder(.11,.11,.38,pink,[.43,-.38,0],crank);handle.rotation.z=Math.PI/2;
 const colors=[0x9ec984,0xf2a35e];
 function capsule(color,parent,r=.235){const g=new THREE.Group();parent.add(g);const top=mesh(new THREE.SphereGeometry(r,10,5,0,Math.PI*2,0,Math.PI/2),mat(color),[0,0,0],g);const bottom=mesh(new THREE.SphereGeometry(r,10,5,0,Math.PI*2,Math.PI/2,Math.PI/2),mat(0xfff5d9),[0,0,0],g);const seam=mesh(new THREE.TorusGeometry(r,.012,4,10),pale,[0,0,0],g);seam.rotation.x=Math.PI/2;return {g,top,bottom,seam};}
 const balls=[];for(let i=0;i<18;i++){const c=capsule(colors[i%2],cat);const row=i<8?0:i<15?1:2;const angle=i*2.399;c.g.position.set(Math.cos(angle)*(row===2?.4:.77),1.78+row*.37,Math.sin(angle)*.57);c.g.rotation.set(i*.7,0,i*.9);c.home=c.g.position.clone();balls.push(c);}
 const dispensed=capsule(colors[0],scene,.28);dispensed.g.visible=false;
 const floor=mesh(new THREE.CircleGeometry(2.7,64),new THREE.ShadowMaterial({opacity:.13}),[0,.02,0],scene);floor.rotation.x=-Math.PI/2;
 const platform=cylinder(1.75,1.82,.07,mat(0xe5e7c7,{roughness:1}),[0,.035,0],scene);
 let start=0,running=false,resolveSpin;const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 function resize(){const {width,height}=container.getBoundingClientRect();renderer.setSize(width,height);camera.aspect=width/height;camera.position.z=width<550?Math.max(8.6,4.7/camera.aspect):9.5;camera.updateProjectionMatrix();}new ResizeObserver(resize).observe(container);resize();
 const raycaster=new THREE.Raycaster();const pointer=new THREE.Vector2();renderer.domElement.addEventListener('pointerup',e=>{const b=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-b.left)/b.width*2-1,-(e.clientY-b.top)/b.height*2+1);raycaster.setFromCamera(pointer,camera);if(raycaster.intersectObject(button).length)onPress();});renderer.domElement.addEventListener('pointermove',e=>{const b=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-b.left)/b.width*2-1,-(e.clientY-b.top)/b.height*2+1);raycaster.setFromCamera(pointer,camera);renderer.domElement.style.cursor=raycaster.intersectObject(button).length?'pointer':'default';});
 renderer.setAnimationLoop(time=>{const t=time/1000;cat.rotation.z=reduced.matches?0:Math.sin(t*1.3)*.025;red.emissiveIntensity=.1+(Math.sin(t*2)+1)*.08;if(running){const elapsed=(performance.now()-start)/1000;const p=elapsed/(reduced.matches?.25:3.3);if(!reduced.matches){cat.rotation.z+=Math.sin(elapsed*30)*.085*Math.max(0,1-p);button.position.z=1.06-Math.sin(Math.min(p*5,1)*Math.PI)*.07;crank.rotation.x=p*Math.PI*6;balls.forEach((c,i)=>{c.g.position.y=c.home.y+Math.abs(Math.sin(elapsed*8+i))*.38*(1-p);c.g.rotation.z+=.025;});if(p>.55){dispensed.g.visible=true;const q=Math.min((p-.55)/.45,1);dispensed.g.position.set(.35*q,.31+Math.abs(Math.sin(q*Math.PI*2))*.45*(1-q),1.2+q*.8);dispensed.g.rotation.z=q*5;const open=Math.max(0,(q-.7)/.3);dispensed.top.position.y=open*.45;dispensed.top.rotation.z=open*.6;}}if(p>=1){running=false;balls.forEach(c=>c.g.position.copy(c.home));button.position.z=1.06;resolveSpin?.();}}renderer.render(scene,camera);
 button.getWorldPosition(buttonPosition);buttonPosition.project(camera);
 edgePosition.set(.28,0,0);button.localToWorld(edgePosition);edgePosition.project(camera);
 const width=container.clientWidth,height=container.clientHeight;
 const diameter=Math.max(44,Math.abs(edgePosition.x-buttonPosition.x)*width+8);
 hitButton.style.left=((buttonPosition.x+1)*width/2)+'px';hitButton.style.top=((-buttonPosition.y+1)*height/2)+'px';hitButton.style.width=diameter+'px';hitButton.style.height=diameter+'px';});
 return {spin(company='solo'){if(running)return Promise.resolve();running=true;dispensed.top.material.color.setHex(company==='together'?colors[1]:colors[0]);dispensed.bottom.material.color.setHex(company==='both'?colors[1]:0xfff5d9);start=performance.now();dispensed.g.visible=false;dispensed.top.position.y=0;dispensed.top.rotation.z=0;return new Promise(resolve=>{resolveSpin=resolve;});}};
}
