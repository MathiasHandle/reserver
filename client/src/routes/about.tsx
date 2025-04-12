import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <>
      <article className="my-8 px-4 sm:mx-auto sm:max-w-2xl sm:px-0">
        <h1 className="mb-4 text-center text-2xl font-bold">About us</h1>

        <div className="flex flex-col gap-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel congue neque. Nam at
            sagittis dolor. Nullam egestas velit ut elit sodales tincidunt. Suspendisse id luctus
            mi. Morbi eget nunc eget elit viverra vestibulum sed ac odio. Integer nec euismod metus.
            Nullam egestas porta tempus. Phasellus tellus augue, lobortis nec feugiat nec, sagittis
            at sapien. <b> In vulputate at odio id interdum. </b>Cras mollis quam purus, at
            tincidunt neque scelerisque nec. In tortor enim, pharetra et convallis at, porta eget
            dolor. Pellentesque in velit ac velit hendrerit bibendum. Sed mauris leo, commodo id
            ante nec, tempus consequat metus. Duis vulputate scelerisque magna, non consectetur
            neque tempus vel.
          </p>

          <p>
            <b>
              Suspendisse eu massa non quam suscipit rhoncus. Quisque aliquam purus eget suscipit
              elementum.
            </b>
            Maecenas eros nibh, fermentum non viverra aliquet, luctus eu lacus. Etiam id magna
            tincidunt, tempor purus faucibus, auctor turpis. Morbi ac mauris convallis felis varius
            laoreet. Duis hendrerit nulla vel mollis malesuada. Phasellus in pulvinar erat, in
            egestas mauris. Praesent posuere tortor id lacinia imperdiet. Sed gravida luctus enim,
            ac dapibus tellus lobortis at. Nunc pellentesque pharetra purus eu viverra. Nam magna
            sapien, auctor eget sollicitudin eu, viverra sed velit. Praesent convallis rutrum nibh.
          </p>

          <p>
            Duis vitae urna vitae orci cursus pulvinar sed sit amet orci. Nunc risus leo, luctus a
            hendrerit quis, sodales a ligula. Vivamus arcu purus, volutpat ut arcu vitae, elementum
            auctor dolor. Curabitur varius, ipsum ut iaculis facilisis, justo nibh maximus erat, ac
            faucibus justo massa semper purus. In id vestibulum lacus. Vestibulum suscipit finibus
            tempor. Praesent sed laoreet dui, ac auctor libero. Mauris sodales nec lorem sit amet
            tristique.
          </p>

          <p>
            Nam pellentesque, elit non mattis egestas, turpis dolor pulvinar est, hendrerit
            vulputate leo lorem nec augue. Donec in volutpat lacus. Fusce accumsan nulla ex, ut
            egestas velit elementum vel. Phasellus at nisl lacus. Nulla feugiat justo ac erat
            faucibus, nec rutrum ipsum placerat.
            <b>
              Duis tincidunt fermentum eros eu aliquam. Phasellus et nulla aliquet, lacinia risus
              vel, tempus mauris. Fusce sollicitudin nec libero nec dignissim. Fusce vitae erat
              diam. Donec fermentum, sem non interdum dictum, enim lorem fermentum arcu, at pretium
              neque nulla eu urna.
            </b>
            Ut sagittis magna non nunc euismod fringilla. Curabitur pharetra, eros posuere dictum
            euismod, leo odio bibendum est, et eleifend justo neque et risus. Morbi ut sapien sit
            amet nisl varius mollis. Sed gravida tortor id est bibendum facilisis. Nullam vel augue
            a turpis ornare porta.
          </p>

          <p>
            Curabitur molestie dolor at porta consequat. Praesent sagittis blandit malesuada.
            Vestibulum gravida odio mauris, sit amet auctor magna commodo at. Sed ornare tortor eu
            dignissim ultricies. In hac habitasse platea dictumst. Vestibulum vestibulum leo sed
            tellus venenatis sodales. Maecenas id convallis nunc, ac aliquet felis. Mauris
            consectetur accumsan mauris et tempus.
          </p>
        </div>
      </article>
    </>
  )
}
