
import React, { useState } from 'react'
import bg from './assets/bg.png'
import photosnap from './assets/photosnap.svg'
import manage from './assets/manage.svg'
import account from './assets/account.svg'
import myhome from './assets/myhome.svg'
import './App.css';

function App() {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      logo: photosnap,
      company: 'Photosnop',
      isNew: true,
      isFeatured: true,
      position: 'Senior Frontend Developer',
      time: 'Full Time',
      location: 'USA only',
      skil: ['Frontend', 'Senior', 'JavaScript'],
      jobType: 'Frontend'
    }
  ])

  const [formData, setFormData] = useState({
      logo: '',
      company: '',
      isNew: false,
      isFeatured: false,
      position: '',
      time: '',
      location: '',
      jobType: '',
      skil: {
      FullStack: false,
      Python: false,
      Midweight: false,
      React: false
    }
  })

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    if (type == 'checkbox') {
      if (name in formData.skil) {
        setFormData(prev => ({
          ...prev,
          skil: {
            ...prev.skil, [name]: checked
          }
        }))
      } else {
        setFormData({ ...formData, [name]: checked })
      }
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const selectedSkills = Object.keys(formData.skil).filter(skill => formData.skil[skill])
    const newJob = {
      ...formData,
      id: Date.now(),
      logo: formData.logo || photosnap,
      skil: selectedSkills
    }
    setJobs([...jobs, newJob])
    setFormData({
      company: '',
      position: '',
      time: '',
      location: '',
      jobType: '',
      skil: {
        FullStack: false,
        Python: false,
        Midweight: false,
        React: false
      }
    })
  }

  function handleDelete(id) {
    setJobs(jobs.filter(job => job.id != id))
  }

  function handleEdit(id) {
    const jobToEdit = jobs.find(job => job.id == id)
    setFormData({
      ...jobToEdit,
      skil: jobToEdit.skil.reduce((acc, skill) => {
        acc[skill] = true;
        return acc;
      }, {
        FullStack: false,
        Python: false,
        Midweight: false,
        React: false
      })
    })
  }

  return (
    <div>
      <header className='bg-[#5CA5A5]'>
        <img src={bg} />
      </header>
      <div className='container mx-auto mb-20'>
        <form onSubmit={handleSubmit} className='border container mx-auto p-10 w-[500px] rounded-xl my-[2%]'>
          <h1 className='text-2xl mb-7 text-center font-bold'>Vakansiya malumotlarini kirting</h1>
          <label className='text-lg font-medium'>Logotip Url</label><br />
          <input className='border mb-4 mt-2 w-full p-1.5 rounded-lg' type="text" name="logo" placeholder='./assets/photosnap.svg' value={formData.logo} onChange={handleChange} /><br />
          <label className='text-lg font-medium'>Kompaniya nomi</label><br />
          <input className='border mb-4 mt-2 w-full p-1.5 rounded-lg' type="text" name="company" placeholder='Kompaniya nomi' value={formData.company} onChange={handleChange} required /><br />

          <div className='flex items-center gap-0.5 my-4'>
            <input className='w-4 h-4' type="checkbox" name="isNew" checked={formData.isNew} onChange={handleChange} />
            <label className='text-lg font-medium ml-2 mr-3'>Yangi</label>
            <input className='w-4 h-4' type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} />
            <label className='text-lg font-medium ml-2'>Featured</label>
          </div>

          <label className='text-lg font-medium'>Lavozim</label><br />
          <input className='border mb-8 mt-2 w-full p-1.5 rounded-lg' type="text" name="position" placeholder='Lavozim' value={formData.position} onChange={handleChange} required /><br />

          <div className='flex mb-10 justify-between items-center gap-15'>
            <div>
              <label className='text-lg font-medium'>Vaqt</label>
              <select className='border rounded-md p-1 mt-1' name="time" value={formData.time} onChange={handleChange}>
                <option value="">Tanlang</option>
                <option value="1 yil">1 yil</option>
                <option value="2 yil">2 yil</option>
                <option value="3 yil">3 yil</option>
              </select>
            </div>
            <div>
              <label className='text-lg font-medium'>Ish turi</label>
              <select className='border rounded-md p-1 mt-1' name="jobType" value={formData.jobType} onChange={handleChange}>
                <option value="">Tanlang</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="FullStack">FullStack</option>
              </select>
            </div>
            <div>
              <label className='text-lg font-medium'>Joylashuv</label>
              <select className='border rounded-md p-1 mt-1' name="location" value={formData.location} onChange={handleChange}>
                <option value="">Tanlang</option>
                <option value="Toshkent">Toshkent</option>
                <option value="Farg'ona">Farg'ona</option>
                <option value="Samarqand">Samarqand</option>
              </select>
            </div>
          </div>

          <div className='flex justify-around'>
            <div>
              <input className='w-4 h-4' type="checkbox" name="FullStack" checked={formData.skil.FullStack} onChange={handleChange} />
              <label className='text-lg font-medium ml-2'>FullStack</label><br />
              <input className='w-4 h-4' type="checkbox" name="Python" checked={formData.skil.Python} onChange={handleChange} />
              <label className='text-lg font-medium ml-2'>Python</label>
            </div>
            <div>
              <input className='w-4 h-4' type="checkbox" name="Midweight" checked={formData.skil.Midweight} onChange={handleChange} />
              <label className='text-lg font-medium ml-2'>Midweight</label><br />
              <input className='w-4 h-4' type="checkbox" name="React" checked={formData.skil.React} onChange={handleChange} />
              <label className='text-lg font-medium ml-2'>React</label>
            </div>
          </div>

          <button type="submit" className='bg-black w-[420px] mt-10 rounded-md p-2 text-center text-xl text-white font-medium'>Save</button>
        </form>

        <div className='mt-10 flex flex-col gap-6 px-80'>
          {jobs.map((job) => (
            <div key={job.id} className='flex justify-between border rounded-md px-10 py-8 items-center'>
              <img src={job.logo} />
              <div>
                <p className='text-[#5CA5A5] text-lg font-bold'>{job.company}</p>
                <h3 className='text-[#2B3939] text-lg font-bold mb-1'>{job.position}</h3>
                <h4 className='text-[#7C8F8F] text-lg'>{job.time} - {job.location}</h4>
              </div>
              <div className='flex gap-3'>
                {job.skil.map((skill, index) => (
                  <h4 key={index} className='bg-[#c1f0f0] text-[#5CA5A5] px-1 rounded-md'>{skill}</h4>
                ))}
              </div>
              <div className='flex gap-3 flex-col'>
                <button onClick={() => handleEdit(job.id)} className='bg-blue-400 cursor-pointer text-white px-2 py-1 rounded-md'>Edit</button>
                <button onClick={() => handleDelete(job.id)} className='bg-red-500 cursor-pointer text-white px-2 py-1 rounded-md'>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App;
