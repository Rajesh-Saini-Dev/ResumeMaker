import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function Resume() {
  const [data, setData] = useState({
    name: "",
    role: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    summary: "",

    experiences: [
      {
        company: "",
        position: "",
        date: "",
        responsibility: "",
      },
    ],

    education: [{ college: "", school: "", year: "", university: "" }],

    skills: [{ name: "" }],
  });

  // ---------- BASIC ----------
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // ---------- EXPERIENCE ----------
  const handleExperienceChange = (index, e) => {
    const newExp = [...data.experiences];
    newExp[index][e.target.name] = e.target.value;
    setData({ ...data, experiences: newExp });
  };

  const addExperience = () => {
    setData({
      ...data,
      experiences: [
        ...data.experiences,
        { company: "", position: "", date: "", responsibility: "" },
      ],
    });
  };

  const removeExperience = (index) => {
    const newExp = data.experiences.filter((_, i) => i !== index);
    setData({ ...data, experiences: newExp });
  };

  // ---------- EDUCATION ----------
  const handleEducationChange = (index, e) => {
    const newEdu = [...data.education];
    newEdu[index][e.target.name] = e.target.value;
    setData({ ...data, education: newEdu });
  };

  const addEducation = () => {
    setData({
      ...data,
      education: [
        ...data.education,
        { college: "", school: "", year: "", university: "" },
      ],
    });
  };

  const removeEducation = (index) => {
    const newEdu = data.education.filter((_, i) => i !== index);
    setData({ ...data, education: newEdu });
  };

  // ---------- SKILLS ----------
  const handleSkillChange = (index, e) => {
    const newSkills = [...data.skills];
    newSkills[index].name = e.target.value;
    setData({ ...data, skills: newSkills });
  };

  const addSkill = () => {
    setData({
      ...data,
      skills: [...data.skills, { name: "" }],
    });
  };

  const removeSkill = (index) => {
    const newSkills = data.skills.filter((_, i) => i !== index);
    setData({ ...data, skills: newSkills });
  };

  // ---------- PDF ----------
  const downloadPDF = async () => {
    const element = document.getElementById("resume");

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("resume.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5 grid md:grid-cols-2 gap-6">
      {/*  Form Section */}
      <div className="bg-white p-5">
        <h2 className="text-xl font-bold mb-4">Resume Form</h2>

        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-2">
          {["name", "role", "address", "phone", "email", "website"].map(
            (field) => (
              <input
                key={field}
                name={field}
                placeholder={field.toUpperCase()}
                value={data[field]}
                onChange={handleChange}
                className="p-1 border"
              />
            ),
          )}
        </div>

        {/* Summary */}
        <textarea
          name="summary"
          placeholder="SUMMARY"
          value={data.summary}
          onChange={handleChange}
          className="w-full mt-2 p-1 border"
        />

        {/* EXPERIENCE */}
        <h3 className="mt-5 font-bold">Experience</h3>
        {data.experiences.map((exp, index) => (
          <div key={index} className="mb-3">
            <div className="grid grid-cols-2 gap-2">
              <input
                name="position"
                value={exp.position}
                onChange={(e) => handleExperienceChange(index, e)}
                placeholder="Position"
                className="p-1 border"
              />
              <input
                name="company"
                value={exp.company}
                onChange={(e) => handleExperienceChange(index, e)}
                placeholder="Company"
                className="p-1 border"
              />
              <input
                name="date"
                value={exp.date}
                onChange={(e) => handleExperienceChange(index, e)}
                placeholder="Date"
                className="col-span-2 p-1 border"
              />
              <textarea
                name="responsibility"
                value={exp.responsibility}
                onChange={(e) => handleExperienceChange(index, e)}
                placeholder="Responsibility"
                className="col-span-2 p-1 border"
              />
            </div>
            <button
              onClick={() => removeExperience(index)}
              className="text-red-500 text-sm mt-2"
            >
              ❌ Remove
            </button>
          </div>
        ))}

        <button
          onClick={addExperience}
          className="bg-green-500 text-white px-3 py-1"
        >
          + Add Experience
        </button>

        {/* EDUCATION */}
        <h3 className="mt-5 font-bold">Education</h3>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-3">
            <div className="grid grid-cols-2 gap-2">
              <input
                name="school"
                value={edu.school}
                onChange={(e) => handleEducationChange(index, e)}
                placeholder="Education"
                className="p-1 border"
              />

              <input
                name="year"
                value={edu.year}
                onChange={(e) => handleEducationChange(index, e)}
                placeholder="Year"
                className="p-1 border"
              />

              <input
                name="college"
                value={edu.college}
                onChange={(e) => handleEducationChange(index, e)}
                placeholder="College"
                className="p-1 border"
              />
              <input
                name="university"
                value={edu.university}
                onChange={(e) => handleEducationChange(index, e)}
                placeholder="University Or Board"
                className="p-1 border"
              />
            </div>

            <button
              onClick={() => removeEducation(index)}
              className="text-red-500 text-sm mt-2"
            >
              ❌ Remove
            </button>
          </div>
        ))}

        <button
          onClick={addEducation}
          className="bg-blue-500 text-white px-3 py-1"
        >
          + Add Education
        </button>

        {/* SKILLS */}
        <h3 className="mt-5 font-bold">Skills</h3>
        <div className="grid grid-cols-3 gap-2">
          {data.skills.map((skill, index) => (
            <div key={index} className="flex gap-1 border w-full">
              <input
                value={skill.name}
                onChange={(e) => handleSkillChange(index, e)}
                placeholder={"Skill"}
                className="p-1 "
              />

              <button
                onClick={() => removeSkill(index)}
                className="text-red-500"
              >
                ❌
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addSkill}
          className="bg-purple-500 text-white px-3 py-1"
        >
          + Add Skill
        </button>

        {/* PDF */}
        <button
          onClick={downloadPDF}
          className="mt-4 bg-purple-600 text-white px-4 py-2 w-full"
        >
          Download PDF
        </button>
      </div>

      {/*  Preview Section */}

      <div className="min-h-screen bg-gray-100 flex justify-center">
        <div id="resume" className="bg-white w-[800px] shadow-lg p-8">
          {/* Header  */}
          <div className="text-center border-b-2 border-black pb-6">
            <h1 className="text-5xl font-bold text-purple-600 tracking-wide">
              {data.name || "NAME"}
            </h1>
            <h2 class="text-3xl font-bold text-purple-600 font-serif">
              {data.role || "Your Role"}
            </h2>
            <p className="text-sm text-black mt-4">
              <span className="pl-3 pr-1">Add:</span>
              {data.address || "Ghanta Ghar Ghaziabad"}{" "}
              <span className="pl-3 pr-1">Phone:</span>
              {data.phone || "9131231231"}
              <span className="pl-3 pr-1">EMail:</span>
              {data.email || "hereyour@gmail.com"}
            </p>

            <p className="text-sm text-black">
              <span className="pr-1">Website:</span>
              {data.website || "hereyourwebsite.com"}
            </p>
          </div>

          {/* Summary  */}
          <section className="mt-6">
            <h2 className="text-purple-700 text-lg font-bold border-b-2 border-black pb-2">
              SUMMARY
            </h2>
            <p className="text-black mt-2 text-sm leading-relaxed ml-2">
              {data.summary || "Your Summary here...."}
            </p>
          </section>

          {/* Work Experience  */}
          <section className="mt-6">
            <h2 className="text-purple-700 text-lg font-bold border-b-2 border-black pb-2">
              WORK EXPERIENCE
            </h2>

            {/* Job   */}
            <div className="mt-3">
              {data.experiences.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between font-semibold">
                    <p>
                      {exp.position || "Position"} , {exp.company || "Company"}
                    </p>
                    <span className="text-sm text-gray-600">
                      {exp.date || "Date"}
                    </span>
                  </div>
                  <ul className="list-disc ml-5 text-sm text-gray-700 mt-1 space-y-1">
                    {exp.responsibility
                      .split("\n")
                      .filter((line) => line.trim())
                      .map((line, idx) => (
                        <li key={idx} className="text-black ml-2">
                          {line}
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Education  */}
          <section className="mt-6">
            <h2 className="text-purple-700 text-lg font-bold border-b-2 border-black pb-2">
              EDUCATION
            </h2>

            <div className="mt-3">
              {data.education.map((edu, i) => (
                <div key={i}>
                  <div className="flex justify-between font-semibold">
                    <p>{edu.school || "Education"}</p>
                    <span className="text-sm text-gray-600">
                      {edu.year || "Year"}
                    </span>
                  </div>
                  <p className="text-sm text-black ml-2">
                    {edu.college || "College"}
                  </p>
                  <p className="text-sm text-black ml-2">
                    {edu.university || "University Or Board"}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Skills  */}
          <section className="mt-6">
            <h2 className="text-purple-700 text-lg font-bold border-b-2 border-black pb-2">
              SKILLS
            </h2>

            <ul className="text-sm font-semibold text-gray-600 mt-2 grid grid-cols-3 gap-2 list-disc list-inside ml-4">
              {data.skills.map((skill, i) => (
                <li key={i}>{skill.name || "Skill"}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
export default Resume;
