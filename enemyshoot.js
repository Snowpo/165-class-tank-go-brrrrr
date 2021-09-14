AFRAME.registerComponent('enemy-bullet',{
    init:function(){
        setInterval(this.shootEnemyBullet,2000)
    }, 
    shootEnemyBullet:function(){
        var els= document.querySelectorAll('.enemy')
        for(var i = 0; i<els.length; i++){
            var enemyBullet = document.createElement('a-entity')
            enemyBullet.setAttribute('geotmetry',{
                primitive:'sphere',radius:0.1
            })
            enemyBullet.setAttribute('material','color','black')
            var position=els[i].getAttribute('position')
            enemyBullet.setAttribute('position',{
                x:position.x+1.5,y:position+3.5,z:position.z
            })
            var scene = document.querySelector('#scene')
            scene.appendChild(enemyBullet)
            var position1 = new THREE.Vector3()
            var position2 = new THREE.Vector3()
            var enemy = els[i].object3D
            var player = document.querySelector('#weapon').object3D
            player.getWorldPosition(position1)
            enemy.getWorldPosition(position2)
            var direction = new THREE.Vector3()
            direction.subVectors(position1,position2).normalize()
            enemyBullet.setAttribute('velocity',direction.multiplyScalar(10))
            enemyBullet.setAttribute('dynamic-body',{shape:'sphere',mask:'0'})
            var element = document.querySelector('#countLife')
            var playerLife = parseInt(element.getAttribute('text').value)
            enemyBullet.addEventListener('collide',function(e){
                if(e.detail.body.el.id==='weapon'){
                    if(playerLife>0){
                        playerLife-=1
                        element.setAttribute('text',{value:playerLife})
                        
                    }
                    if(playerLife<=0){
                        var text = document.querySelector('#over')
                        text.setAttribute('visible',true)
                    var tankel=document.querySelectorAll('.enemy')
                        for(var i = 0;i<tankel.length; i++){
                            scene.removeChild(tankel[i])
                        }
                    }
                }
            })
        }
    }
})