const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const scoreEl = document.querySelector('#scoreEl')
const vidaEl = document.querySelector('#vidaEl')
const tempoEl = document.querySelector('#tempoEl')

canvas.width = innerWidth/1.32
canvas.height = innerHeight/1.2

function newGame(){
    var vidas = 3
    vidaEl.innerHTML = vidas

    var tempo = 0
    tempoEl.innerHTML = tempo

    function tempoSec(){
        tempo+=1
        tempoEl.innerHTML = tempo
    }
    const tempoInterval = setInterval(tempoSec, 1000)
    
    class Boundary{
        static width = 40
        static height = 40
        constructor({position}){
            this.position = position
            this.width= 40
            this.height= 40
        }
        draw(){
            c.fillStyle='blue'
            c.fillRect(this.position.x, this.position.y, this.width, this.height)
        }
    }

    class Player{
        constructor({position, velocity, imageSrc}){
            this.position = position
            this.velocity = velocity
            this.image = new Image();
            this.image.src = imageSrc;
            this.radius = 17
        }
        draw(){
            // c.beginPath()
            // c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
            // c.fillStyle = 'yellow'
            // c.fill()
            // c.closePath()
            c.drawImage(this.image, this.position.x - this.radius, this.position.y - this.radius, this.radius * 2, this.radius * 2);
        }
        update(){
            this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
        }
    }

    class Ghost{
        static speed = 2
        constructor({position, velocity, color='red', imageSrc, idGhost}){
            this.position = position
            this.velocity = velocity
            this.speed = 2
            this.radius = 17
            this.color = color 
            this.prevCollisions=[]
            this.scared = false 
            this.dead = false 
            this.image = new Image();
            this.image.src = imageSrc;
            this.idGhost = idGhost
        }
        draw(){
            if(this.dead == false){    
                // c.beginPath()
                // c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
                // c.fillStyle = this.scared ? 'blue' : this.color
                // c.fill()
                // c.closePath()
                            
                c.drawImage(this.image, this.position.x - this.radius, this.position.y - this.radius, this.radius * 2, this.radius * 2);

            }else{
                
            }
        }
        update(){
            this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
        }
    }

    class Pellet{
        constructor({position, imageSrc}){
            this.position = position
            this.radius = 9
            this.image = new Image();
            this.image.src = imageSrc;
        }
        draw(){
            // c.beginPath()
            // c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
            // c.fillStyle = 'white'
            // c.fill()
            // c.closePath()
            c.drawImage(this.image, this.position.x - this.radius, this.position.y - this.radius, this.radius * 2, this.radius * 2);

        }
    }

    class Cereja{
        constructor({position, imageSrc}){
            this.position = position
            this.radius = 10
            this.image = new Image();
            this.image.src = imageSrc;
        }
        draw(){
            // c.beginPath()
            // c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
            // c.fillStyle = 'white'
            // c.fill()
            // c.closePath()
            c.drawImage(this.image, this.position.x - this.radius, this.position.y - this.radius, this.radius * 2, this.radius * 2);

        }
    }

    class PowerUp{
        constructor({position, imageSrc}){
            this.position = position
            this.radius = 17
            this.image = new Image();
            this.image.src = imageSrc;
        }
        draw(){
            // c.beginPath()
            // c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
            // c.fillStyle = 'white'
            // c.fill()
            // c.closePath()
            c.drawImage(this.image, this.position.x - this.radius, this.position.y - this.radius, this.radius * 2, this.radius * 2);

        }
    }

    const map=[
        
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '.', '.', '.', '.', '.', '.', '.', '.', '.', '-', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'M', '-'],
        ['-', '.', '-', '-', '.', '-', '.', '-', '-', '.', '-', '.', '-', '.', '-', '.', '-', '-', '-', '-', '-', '.', '-', '-', '.', '-'],
        ['-', '.', '-', '.', '.', '-', '.', '.', '-', '.', '-', '.', 'M', '.', '-', '.', '.', '.', '.', '.', '.', '.', '-', '-', '.', '-'],
        ['-', '.', '-', '.', '-', '-', '-', '.', '-', '.', '-', '-', '-', '.', '-', '.', '-', '-', '.', '-', '-', '.', '-', '-', '.', '-'],
        ['-', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '-', '.', '.', '.', '.', '.', '.', '.', '-'],
        ['-', '-', '-', '-', '.', '-', '-', '.', '-', '-', '.', '-', '-', '-', '-', '-', '.', '-', '-', '.', '-', '-', '-', '-', '.', '-'],
        ['-', '.', '.', '.', '.', '.', '.', '.', '.', '-', '.', ' ', ' ', 'C', ' ', ' ', '.', '.', '.', '.', '.', '.', '.', '.', '.', '-'],
        ['-', '.', '-', '.', '-', '-', '.', '-', '.', '-', '.', '-', '-', ' ', '-', '-', '.', '-', '.', '-', '-', '-', '.', '-', '-', '-'],
        ['-', '.', '-', '.', '.', '-', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '-', '.', '.', '.', '-', '.', '.', '.', '-'],
        ['-', '.', '-', '-', '.', '-', '.', '-', '-', '.', '-', '.', '-', '.', '-', '.', '-', '-', '-', '-', '.', '-', '-', '-', '.', '-'],
        ['-', 'M', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '-', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-',  '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-','-', '-', '-', '-'],

        // ['-', '-','-', '-'],
        // ['-','M', '.','.', '-'],
        // ['-','.', '-','.', '-'],
        // ['-','C', '.','.', '-'],
        // ['-', '-', '-','-',],
    ]

    const pellets = []
    const cereja =[]
    const powerUps = []
    const boundaries = []

    const ghost = [
        new Ghost({
            position:{
                x: Boundary.width * 13  + Boundary.width / 2,
                y: Boundary.height * 7+ Boundary.height / 2,
            },
            velocity:{
                x:0,
                y:Ghost.speed,
            },
            color: 'cyan',
            imageSrc: 'imgs/ghost1E.png',
            idGhost: 1

        }),
        new Ghost({
            position:{
                x: Boundary.width * 13  + Boundary.width / 2,
                y: Boundary.height * 7+ Boundary.height / 2,
            },
            velocity:{
                x:0,
                y:Ghost.speed,
            },
            color: 'cyan',
            imageSrc: 'imgs/ghost2E.png',
            idGhost: 2

        }),
        new Ghost({
            position:{
                x: Boundary.width * 13  + Boundary.width / 2,
                y: Boundary.height * 7+ Boundary.height / 2,
            },
            velocity:{
                x:0,
                y:Ghost.speed,
            },
            color: 'cyan',
            imageSrc: 'imgs/ghost3E.png',
            idGhost: 3

        }),
        new Ghost({
            position:{
                x: Boundary.width * 13  + Boundary.width / 2,
                y: Boundary.height * 7+ Boundary.height / 2,
            },
            velocity:{
                x:0,
                y:Ghost.speed,
            },
            color: 'cyan',
            imageSrc: 'imgs/ghost4E.png',
            idGhost: 4

        })
    ]

    const player = new Player({
        position:{
            x: Boundary.width + Boundary.width / 2,
            y: Boundary.height + Boundary.height / 2,
        },
        velocity:{
            x:0,
            y:0
        },
        imageSrc: 'imgs/player.png'
    })

    const keys ={
        w:{
            pressed: false
        },
        s:{
            pressed: false
        },
        d:{
            pressed: false
        },
        a:{
            pressed: false
        }
    }

    map.forEach((row, i)=>{
        row.forEach((symbol, j)=>{
            switch (symbol){
                
                case '-':
                    
                    boundaries.push(
                        new Boundary({
                            position:{
                                x: Boundary.width * j,
                                y: Boundary.height * i
                            }
                        })
                    )
                    break
                case '.':
                    
                    pellets.push(
                        new Pellet({
                            position:{
                                x: j * Boundary.width + Boundary.width / 2,
                                y: i * Boundary.height + Boundary.height / 2,
                            },
                            imageSrc: 'imgs/pellet.png'
                        })
                    )
                    break
                case 'M':
                    powerUps.push(
                        new PowerUp({
                            position:{
                                x: j * Boundary.width + Boundary.width / 2,
                                y: i * Boundary.height + Boundary.height / 2,
                            },
                            imageSrc: 'imgs/powerUp.png'
                        })
                    )
                    break
                case 'C':
                    cereja.push(
                        new Cereja({
                            position:{
                                x: j * Boundary.width + Boundary.width / 2,
                                y: i * Boundary.height + Boundary.height / 2,
                            },
                            imageSrc: 'imgs/cereja.png'
                        })
                    )
                    break

            }   
        })
    })

    var bolinhasRestantes = pellets.length

    function circleCollidesWithRectanglePlayer({
        circle,
        rectangle
    }){
        return(
            circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height &&
            circle.position.x+circle.radius + circle.velocity.x >= rectangle.position.x &&
            circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y &&
            circle.position.x- circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width
        )
    }

    function circleCollidesWithRectangle({ circle, rectangle }) {
        const padding = Boundary.width / 2 - circle.radius - 1
        return (
            circle.position.y - circle.radius + circle.velocity.y <=
            rectangle.position.y + rectangle.height + padding &&
            circle.position.x + circle.radius + circle.velocity.x >=
            rectangle.position.x - padding &&
            circle.position.y + circle.radius + circle.velocity.y >=
            rectangle.position.y - padding &&
            circle.position.x - circle.radius + circle.velocity.x <=
            rectangle.position.x + rectangle.width + padding
        )
    }

    function perdeuTela(){

        window.open("gameOver.html")//aki vai linka pra outra tela
        clearInterval(tempoInterval)
    }

    let scoreR = pellets.length
    let scoreB = pellets.length + 50
    let scoreM = pellets.length + 80

    function ganhouTela(tempo){
        clearInterval(tempoInterval)
        c.clearRect(0,0,canvas.width, canvas.height)
        if(score>=scoreM && vidas==3 && tempo <= 40) {
            window.open("MB.html")
        }
        else if(score>=scoreB && vidas>=2 &&tempo <= 60)  {
            window.open("B.html")
        }
        else if(score>=scoreR)  {
            window.open("R.html")
        }else{}
    }

    function tpGhosts(){
        ghost.forEach(ghost=>{
            ghost.dead=false
            ghost.velocity.x = Ghost.speed
            ghost.velocity.y = 0
            ghost.position.x = Boundary.width * 13 + Boundary.width / 2
            ghost.position.y =Boundary.height * 7+ Boundary.height / 2
        })
    }

    let score = 0

    let animationId

    function animate (){

        animationId = requestAnimationFrame(animate)
        if(keys.w.pressed && lastKey === 'w'){
            for(let i = 0; i<boundaries.length; i++){
                const boundary = boundaries[i]
                if(circleCollidesWithRectanglePlayer({circle:{...player, velocity:{ x:0, y:-7}}, rectangle:boundary})){
                    player.velocity.y=0
                    break
                }else{
                    player.velocity.y=-5
                }
            }

        } else if (keys.s.pressed && lastKey === 's'){
            for(let i = 0; i<boundaries.length; i++){
                const boundary = boundaries[i]
                if(circleCollidesWithRectanglePlayer({circle:{...player, velocity:{ x:0, y:7}}, rectangle:boundary})){
                    player.velocity.y=0
                    break
                }else{
                    player.velocity.y=5
                }
            } 
        }else if (keys.a.pressed && lastKey === 'a'){
            for(let i = 0; i<boundaries.length; i++){
                const boundary = boundaries[i]
                if(circleCollidesWithRectanglePlayer({circle:{...player, velocity:{ x:-7, y:0}}, rectangle:boundary})){
                    player.velocity.x=0
                    break
                }else{
                    player.velocity.x=-5,
                    player.image.src = 'imgs/player2.png'
                }
            }
        }else if (keys.d.pressed && lastKey === 'd'){
            for(let i = 0; i<boundaries.length; i++){
                const boundary = boundaries[i]
                if(circleCollidesWithRectanglePlayer({circle:{...player, velocity:{ x:7, y:0}}, rectangle:boundary})){
                    player.velocity.x=0
                    break
                }else{
                    player.velocity.x=5,
                    player.image.src = 'imgs/player.png'
                }
            }
        }
        else{}
        
        c.clearRect(0,0,canvas.width, canvas.height)

        for (let i = pellets.length -1; 0 <= i; i--){//45
            const pellet = pellets[i]
            pellet.draw()
        
            if(Math.hypot(pellet.position.x - player.position.x, pellet.position.y - player.position.y)<pellet.radius+player.radius){
                pellets.splice(i,1)
                bolinhasRestantes-=1
                score+=1
            }
            
        }

        if (bolinhasRestantes==0){
            ganhouTela(tempo)
            cancelAnimationFrame(animationId)
            
        }

        for (let i = powerUps.length -1; 0 <= i; i--){
            const powerUp = powerUps[i]
            powerUp.draw()
        
            if(Math.hypot(powerUp.position.x - player.position.x, powerUp.position.y - player.position.y)<powerUp.radius+player.radius){
                powerUps.splice(i,1) 

                ghost.forEach(ghost =>{
                    ghost.scared = true 
                    setTimeout(()=>{
                        ghost.scared = false 
                    }, 6000)
                })
            }
            
        }

        for (let i = cereja.length -1; 0 <= i; i--){
            const cerejaT = cereja[i]
            cerejaT.draw()
        
            if(Math.hypot(cerejaT.position.x - player.position.x, cerejaT.position.y - player.position.y)<cerejaT.radius+player.radius){
                cereja.splice(i,1) 
                score+=10
            }
            
        }
        

        boundaries.forEach((boundary)=>{
            boundary.draw()

            if(circleCollidesWithRectangle({circle: player, rectangle: boundary}))
                {
                    player.velocity.y= 0
                    player.velocity.x= 0
                }
        })

        player.update()
        
        ghost.forEach(ghost=>{
            ghost.update()
            console.log(ghost.idGhost)

            if (Math.hypot(ghost.position.x - player.position.x,ghost.position.y - player.position.y) <ghost.radius + player.radius)
            {
                if(ghost.scared==false && ghost.dead==false){
                    if(vidas == 9){
                        cancelAnimationFrame(animationId)
                        perdeuTela()
                        clearInterval(tempoInterval)
                    }else{
                        tpGhosts()
                        console.log("PERDEU VIDA MLK")
                        //vidas -= 1
                        //player.velocity.x = 0
                        //player.velocity.y = 0
                        //player.position.x = Boundary.height + Boundary.height / 2,
                        //player.position.y = Boundary.height + Boundary.height / 2,
                        
                        vidaEl.innerHTML = vidas
                    }
                }else{
                    if(ghost.dead == false){
                        ghost.dead = true
                        score+=20
                    }
                    
                }
                
            }

            const collisions = []
            boundaries.forEach((boundary) => {
                if (!collisions.includes('right') &&circleCollidesWithRectangle({circle: {...ghost,velocity: {x: 5,y: 0,},},rectangle: boundary,})) 
                {
                    collisions.push('right')
                }

                if (!collisions.includes('left') &&circleCollidesWithRectangle({circle: {...ghost,velocity: {x: -5,y: 0,},},rectangle: boundary,})) 
                {
                    collisions.push('left')
                }

                if (!collisions.includes('up') &&circleCollidesWithRectangle({circle: {...ghost,velocity: {x: 0,y: -5,},},rectangle: boundary,})) 
                {
                    collisions.push('up')
                }

                if (!collisions.includes('down') &&circleCollidesWithRectangle({circle: {...ghost,velocity: {x: 0,y: 5,},},rectangle: boundary,})) 
                {
                    collisions.push('down')
                }

            })

            if (collisions.length > ghost.prevCollisions.length)
            {
                ghost.prevCollisions = collisions
            }

            if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)) {

                if (ghost.velocity.x > 0) ghost.prevCollisions.push('right')
                else if (ghost.velocity.x < 0) ghost.prevCollisions.push('left')
                else if (ghost.velocity.y < 0) ghost.prevCollisions.push('up')
                else if (ghost.velocity.y > 0) ghost.prevCollisions.push('down')

                const pathways = ghost.prevCollisions.filter((collision) => {
                    return !collisions.includes(collision)
                })

                const direction = pathways[Math.floor(Math.random() * pathways.length)]

                switch (direction) {
                    case 'down':
                        ghost.velocity.y = Ghost.speed
                        ghost.velocity.x = 0
                        if(ghost.idGhost==1){
                            if(ghost.scared==true) ghost.image.src = 'imgs/ghostScared2.png'
                            else ghost.image.src = 'imgs/ghost1E.png'
                        }else if(ghost.idGhost ==2){
                            if(ghost.scared==true) ghost.image.src = 'imgs/ghostScared2.png'
                            else ghost.image.src = 'imgs/ghost2E.png'
                        }else if(ghost.idGhost ==3){
                            if(ghost.scared==true) ghost.image.src = 'imgs/ghostScared2.png'
                            else ghost.image.src = 'imgs/ghost2E.png'
                        }else if(ghost.idGhost ==4){
                            if(ghost.scared==true) ghost.image.src = 'imgs/ghostScared2.png'
                            else ghost.image.src = 'imgs/ghost2E.png'
                        }
                        
                    break

                    case 'up':
                        ghost.velocity.y = -Ghost.speed
                        ghost.velocity.x = 0
                        if(ghost.idGhost==1){
                            if(ghost.scared==true) ghost.image.src = 'imgs/ghostScared2.png'
                            else ghost.image.src = 'imgs/ghost1D.png'
                        }else if(ghost.idGhost ==2){
                            if(ghost.scared==true) ghost.image.src = 'imgs/ghostScared2.png'
                            else ghost.image.src = 'imgs/ghost2D.png'
                        }else if(ghost.idGhost ==3){
                            if(ghost.scared==true) ghost.image.src = 'imgs/ghostScared2.png'
                            else ghost.image.src = 'imgs/ghost2D.png'
                        }else if(ghost.idGhost ==4){
                            if(ghost.scared==true) ghost.image.src = 'imgs/ghostScared2.png'
                            else ghost.image.src = 'imgs/ghost2D.png'
                        }
                    break

                    case 'right':
                        ghost.velocity.y = 0
                        ghost.velocity.x = Ghost.speed
                        if(ghost.idGhost==1){
                            if(ghost.scared==true) ghost.image.src = 'imgs/ghostScared2.png'
                            else ghost.image.src = 'imgs/ghost1D.png'
                        }else if(ghost.idGhost ==2){
                            if(ghost.scared==true) ghost.image.src = 'imgs/ghostScared2.png'
                            else ghost.image.src = 'imgs/ghost2D.png'
                        }else if(ghost.idGhost ==3){
                            if(ghost.scared==true) ghost.image.src = 'imgs/ghostScared2.png'
                            else ghost.image.src = 'imgs/ghost2D.png'
                        }else if(ghost.idGhost ==4){
                            if(ghost.scared==true) ghost.image.src = 'imgs/ghostScared2.png'
                            else ghost.image.src = 'imgs/ghost2D.png'
                        }
                    break

                    case 'left':
                        ghost.velocity.y = 0
                        ghost.velocity.x = -Ghost.speed
                        if(ghost.idGhost==1){
                            if(ghost.scared==true) ghost.image.src = 'imgs/ghostScared2.png'
                            else ghost.image.src = 'imgs/ghost1E.png'
                        }else if(ghost.idGhost ==2){
                            if(ghost.scared==true) ghost.image.src = 'imgs/ghostScared2.png'
                            else ghost.image.src = 'imgs/ghost2E.png'
                        }else if(ghost.idGhost ==3){
                            if(ghost.scared==true) ghost.image.src = 'imgs/ghostScared2.png'
                            else ghost.image.src = 'imgs/ghost2E.png'
                        }else if(ghost.idGhost ==4){
                            if(ghost.scared==true) ghost.image.src = 'imgs/ghostScared2.png'
                            else ghost.image.src = 'imgs/ghost2E.png'
                        }
                    break
                }
                ghost.prevCollisions = []
            }
        })

        scoreEl.innerHTML = score
    }
    animate()


    let lastKey = ''
    addEventListener('keydown', ({ key }) => {
        switch (key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
        }
    })

    addEventListener('keyup', ({key}) => {
        switch(key){
            case 'w':
                keys.w.pressed = false
                break
            case 'a':
                keys.a.pressed = false
                break
            case 's':
                keys.s.pressed = false
                break
            case 'd':
                keys.d.pressed = false
                break
        }
    })
}

function GameWinTelaTeste(){
    animationId = requestAnimationFrame(animate)
    cancelAnimationFrame(animationId)
    c.clearRect(0,0,canvas.width, canvas.height)

}