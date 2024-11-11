import generalPhysician from "../assets/assets_frontend/General_physician.svg";
import gynecologist from "../assets/assets_frontend/Gynecologist.svg";
import pediatrician from "../assets/assets_frontend/Pediatricians.svg";
import dermatologist from "../assets/assets_frontend/Dermatologist.svg";
import neurologist from "../assets/assets_frontend/Neurologist.svg";    
import gastroenterologist from "../assets/assets_frontend/Gastroenterologist.svg";



type Speciality = {
    title: string;
    image: string;
}

const FindBySpeciality = () => {

    const speciality: Speciality[] = [
        {
            title: "General Physician",
            image: generalPhysician
        },
        {
            title: "Gynecologist",
            image: gynecologist
        },
        {
            title: "Pediatrician",
            image: pediatrician
        },
        {
            title: "Dermatologist",
            image: dermatologist
        },
        {
            title: "Neurologist",
            image: neurologist
        },
        {
            title: "Gastroenterologist",
            image: gastroenterologist
        },
    ]

  return (
    <section className="flex flex-col items-center py-10">
      <div className=" text-3xl mb-2 text-gray-700">Find by Speciality</div>
      <div className="text-center font-light text-gray-500 mb-8 md:w-[50%] tracking-normal">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </div>
      <div className="flex gap-4 flex-wrap justify-center">

        {
            speciality.map((speciality, index) => {
                const {title, image} = speciality
                return (
                    <div  key={index} className="flex flex-col items-center cursor-pointer w-[126px] hover:bg-green-500 hover:text-white rounded-md p-2">   
                        <img src={image} alt="" className="w-full object-cover" />
                        <span className="font-thin text-xs text-gray-800">{title}</span>
                    </div>
                )
            })

        }

      </div>
    </section>
  );
};

export default FindBySpeciality;
