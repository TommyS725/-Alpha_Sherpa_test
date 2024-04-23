const contact_mail = "ching.chit@gmail.com" as const


const repo_link = "https://github.com/TommyS725/Alpha_Sherpa_test" as const

const Footer: React.FC = () => {
    return (
        <footer className='mt-16 grid grid-flow-col justify-around overflow-y-scroll bg-slate-500   dark:bg-slate-900 text-white h-[7vh] items-center font-mono  font-medium  cursor-default' >
            <div>Alpha Sherpa Frontend Test</div>
            <div>By: Tommy Shum Ching Chit </div>
            <a href={repo_link} target='_blank' className='cursor-pointer'>GitHub Repository</a>
            <div>Contact: <a href={"mailto:" + contact_mail} className=' underline  cursor-pointer'>{contact_mail}</a></div>
        </footer>
    )
}



export default Footer