import SelectedCategory from "@/components/selectedCategory"
import CreationBottomBar from "@/components/creationBottomBar";
import {createCategory} from "@/actions"

export default function Structure({params}:{params:{id:string}}){
  return (
    <>
      <div className="w-full container md:w-4/5 lg:w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Which of these best describe your Home?
        </h2>
      </div>
      <form action={createCategory}>
        <input type="hidden" name="homeId" value={params.id} />
        <SelectedCategory />
        <CreationBottomBar />
      </form>
    </>
  )
}