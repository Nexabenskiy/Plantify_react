import { useEffect } from 'react'
import article1 from '../../public/images/guide/photo-01.webp'
import article2 from '../../public/images/guide/photo-02.webp'

export default function Guide() {
  useEffect(() => {
    window.scrollTo(0, 0)
  })
  return (
    <section className="w-full h-max">
      <div className="block-container mt-40 md:mt-60 flex gap-10 flex-col">
        <article className="grid grid-cols-1 md:grid-cols-2 md:items-start gap-7">
          <div className="w-full  relative h-[390px]">
            <img src={article1} alt="" className="object-cover w-full h-full" />
            <div className="green-filter absolute w-full h-full top-0 left-0"></div>
          </div>
          <div>
            <h2 className="md:text-2xl text-xl text-firm leading-7 tracking-widest mb-5 font-chill line-clamp-1">Kalanchoe is not just a bouquet in a pot</h2>
            <div className="text-firm">
              <p>
                Kalanchoe is not just a green succulent on the windowsill. This genus unites dozens, if not hundreds of the most interesting varieties and forms, among which there are both classic
                "healers" and real exotics, similar either to miniature trees or to overseas sculptures. And if you still thought that kalanchoe was just something that mom put in the kitchen "for a
                cold," get ready to be surprised. We will tell you what types of kalanchoe there are, how they differ, and why this plant is able to seriously captivate even the most sophisticated
                flower growers...
              </p>
            </div>
          </div>
        </article>
        <article className="grid grid-cols-1 md:grid-cols-2 md:items-start gap-7">
          <div className="w-full relative h-[390px]">
            <img src={article2} alt="" className="object-cover w-full h-full" />
            <div className="green-filter absolute w-full h-full top-0 left-0"></div>
          </div>
          <div>
            <h2 className="md:text-2xl text-xl text-firm leading-7 tracking-widest mb-5 font-chill line-clamp-1">Awareness through plants</h2>
            <div className="text-firm">
              <p>
                In our modern world of skyscrapers, digital workspaces, and smartphone notifications, it's easy to see that we've become far removed from the natural world. Our overly stimulated
                brains tend to run away from thinking about what we really like, we plan for the future, fixate on the past and do not pay much attention to what is happening to us in the present.
                However, green plants are ideal tools for practicing mindfulness. Learn how plants can help us stay mindful and enjoy the present moment...
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
