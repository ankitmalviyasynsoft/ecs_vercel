import { getPastSummit } from '@/service/culture-summit/past-summit/getPastSummit'

export default async function Page() {
  const pastSummitData = await getPastSummit({})

  return (
    <section>
      <h1>Culture Summit – Past Summits</h1>
      <pre>{JSON.stringify(pastSummitData, null, 2)}</pre>
    </section>
  )
}
