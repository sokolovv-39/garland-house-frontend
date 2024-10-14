import { AllMeasures } from "@/fsd/widgets"
export default function ObjectsPage({ params }: {
  params: {
    measure: string
  }
}) {
  return <AllMeasures numberOfOrder={Number(params.measure)}/>
}
