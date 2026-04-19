import BlackHole from './BlackHole.js'
import Experience from './Experience.js'
import Stars from './Stars.js'
import Spaceship from './Spaceship.js'

export default class World
{
    constructor(_options)
    {
        this.experience = new Experience()
        this.config = this.experience.config
        this.scenes = this.experience.scenes
        this.resources = this.experience.resources

        this.blackHole = new BlackHole()


        // couting stars
        this.stars = new Stars()



        // this.resources.on('groupEnd', (_group) =>
        // {
        //     if(_group.name === 'base')
        //     {
        //         this.spaceship = new Spaceship()
        //     }
        // })
    }


    // couting stars 
    getStarsCount()
    {
        return this.stars.particles.count
    }

    setStarsCount(_count)
    {
        this.stars.setCount(_count)
    }



    resize()
    {        
        if(this.blackHole)
            this.blackHole.resize()
    }

    update()
    {
        if(this.blackHole)
            this.blackHole.update()
        
        // if(this.spaceship)
        //     this.spaceship.update()
    }

    destroy()
    {
    }
}
