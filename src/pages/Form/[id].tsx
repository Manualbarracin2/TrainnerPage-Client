import Footer from "@/components/Footer";
import FormDataX from "@/components/FormDataX";
import NavBar from "@/components/NavBar";
import OptionChoser from "@/components/OptionsChocer";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormatText } from "@/utils/FormatText";
import PaymentWindow from "@/components/PaymentWindow";



interface Opcion {
    semanas: number;
    price: number;
}

interface Plan {
    id: number;
    titulo: string;
    frase: string;
    check: number;
    opciones: Opcion[];
    atencion: {
        dias: string[];
        horario: string;
    };
}

interface Pregunta {
    pregunta: string;
    aclaracion?: string;
    type?: boolean;
}

const PlanDetail = () => {
    const [opcionSelected, setOpcion] = useState<number>();
    const [price, setPrice] = useState<number>();
    const [respuestas, setRespuestas] = useState<Record<number, string | File[]>>({});
    const [errores, setErrores] = useState<number[]>([])
    const [data, setData] = useState<FormData>()
    const [subject, setSubject] = useState<string>()
    
    const router = useRouter();
    const id = Number(router.query.id);

    const plans: Plan[] = [
        {  
            id:0,
            titulo: 'Basic',
            frase: 'Entrenamiento personalizado para comenzar con seguridad',
            check: 25,
            opciones: [
                {
                    semanas: 4,
                    price: 30000
                },
                {
                    semanas: 8,
                    price: 50000
                },
                {
                    semanas: 12,
                    price: 75000
                },
            ],        
            atencion: {
                dias: ['Martes', 'Jueves'],
                horario: '12 a 16 PM'
            }
        },
        {  
            id:1,
            titulo: 'Standard',
            frase: 'Más seguimiento y optimización para tu progreso',
            check: 20,
            opciones: [
                {
                    semanas: 4,
                    price: 38000
                },
                {
                    semanas: 8,
                    price: 65000
                },
                {
                    semanas: 12,
                    price: 100000
                },
            ], 
            atencion: {
                dias: ['Lunes','Miercoles','Viernes'],
                horario: '12 a 16 PM'
            }
        },
        {  
            id:2,
            titulo: 'Premium',
            frase: 'Atención exclusiva y seguimiento avanzado',
            check: 15,
            opciones: [
                {
                    semanas: 4,
                    price: 50000
                },
                {
                    semanas: 8,
                    price: 90000
                },
                {
                    semanas: 12,
                    price: 135000
                },
            ], 
            atencion: {
                dias: ['Lunes','Martes','Miercoles','Jueves','Viernes'],
                horario: '9 a 22 PM'
            }
        },
    ]
    
    const usedPlan: Plan = plans[id];
    
    const preguntas: Pregunta[] = [
        {
            pregunta: 'Ingresa tu nombre y apellido: '
        },
        {
            pregunta: 'Ingresa tu peso, altura y edad: ',
        },
        {
            pregunta: 'Ingrese su horario de entrenamiento: ',
        },
        {
            pregunta: 'Ingresa a qué hora te despiertas y a qué hora te acuestas: ',
        },
        {
            pregunta: 'Ingrese las comidas que hace en el dia: ',
        },
        {
            pregunta: ' Si ya sigues una rutina dietética, ingresa lo que comes en cada comida: ',
            aclaracion: '(si no sigues una rutina, di lo que comes, esto es importante)',
        },
        {
            pregunta: 'Ingresa los suplementos que utiliza: ',
            aclaracion: '(En caso de no usar aclararlo igualmente)',
        },
        {
            pregunta: 'Ingresa cuantas veces a la semana realiza entrenamiento de pesas u otra actividad y en que horario',
        },
        {
            pregunta: 'Ingresa cual es el momento del dia en el que reportas mayor hambre: ',
        },
        {
            pregunta: 'Tiene alguna intolerancia alimentaria?',
            aclaracion: '(gluten/lactosa, en caso de no tener aclararlo igualmente)',
        },
        {
            pregunta: 'Ingresar cual es su disponibilidad de Dias/Semana para entrenar: ',
        },
        {
            pregunta: '¿Desde cuándo practicas actividad física regularmente?',
            aclaracion: '(En caso de no entrenar con anterioridad aclararlo igualmente)',
        },
        {
            pregunta: '¿Practicas alguna otra actividad?',
            aclaracion: '(Especificar tiempo y frecuencia)',
        },
        {
            pregunta: '¿Tiene alguna limitación para hacer ejercicio?',
        },
        {
            pregunta: '¿Tiene alguna enfermedad o toma medicación continua?',
            aclaracion: '(anticonceptiva por ejemplo)',
        },
        {
            pregunta: '¿Alguna vez ha usado esteroides anabólicos u otros medicamentos con fines estéticos?',
            aclaracion: '(informe todos los compuestos o medicamentos en uso o todo el historial de uso por favor)',
        },
        {
            pregunta: 'Describa su calidad de sueño: ',
        },
        {
            pregunta: '¿Tiene antecedentes de Diabetes en familiares cercanos?',
        },
        {
            pregunta: '¿Tiene enfermedad del tracto gastrointestinal?',
        },
        {
            pregunta: '¿Cuál es su objetivo con la consultoría?',
        },
        {
            pregunta: 'Fotos: de frente, de espalda y de perfil',
            aclaracion: '(Necesarias para evaluar tu fisico, hombre con ropa interior y mujer con topper y short o bikini)',
            type: true,
        },
        {
            pregunta: 'Ingrese su numero telefonico: ',
            aclaracion: '(El plan sera enviado por WhatsApp, asegurese de no cometer errores)',
        },
    ]

    const handleSelectOption = (index: number, price: number) => {
        setOpcion(index + 1);
        setPrice(price);
    };

    const handleChange = (index: number, value: string | FileList) => {
        setRespuestas(prev => ({
            ...prev,
            [index]: value instanceof FileList ? Array.from(value) : value
        }));
    };

    const handleSubmit = async () => {
        const preguntasIncompletas: number[] = [];
    
        preguntas.forEach((_, index) => {
            if (!respuestas[index] || respuestas[index] === '') {
                preguntasIncompletas.push(index);
            }
        });
    
        if (preguntasIncompletas.length > 0) {
            setErrores(preguntasIncompletas)
            alert(`Por favor, completa todas las preguntas antes de enviar. Preguntas incompletas: ${preguntasIncompletas.join(', ')}`);
            return;
        }
    
        if (respuestas[19].length === 0) {
            alert("Por favor, ingresa las imágenes para continuar");
            return;
        }

        if(!opcionSelected){
            alert("Por favor, selecciona la duracion del plan para continuar");
            return;
        }
    
        const subject = respuestas[0] + ' | ' + 'Plan: ' + usedPlan.titulo + ' | ' + 'Opcion: ' + opcionSelected
        setSubject(subject)
        const { text, images } = FormatText({ preguntas, respuestas });

        const formData = new FormData();
        text.forEach((str) => {
            formData.append('text', str);  // 'strings[]' es el nombre del campo
        });
        
        images.forEach((image) => {
            formData.append('images', image);
        });

        formData.append('subject', subject)
        setData(formData)
        console.log(formData)
        
    }

    return (
        <div>
            {usedPlan && 
            <>
            <NavBar/>
            <div className="background flex flex-col p-2 lg:p-10">
                <div className="flex flex-col justify-center items-center p-5">
                    <h1 className="text-white text-2xl lg:text-4xl">Plan seleccionado: {usedPlan.titulo}</h1>
                    <p className="text-white text-xl lg:text-4xl">Rellene los siguientes datos</p>
                </div>
                <OptionChoser optionSelected={opcionSelected} usedPlan={usedPlan} price={price} handleSelectOption={handleSelectOption}/>
                <FormDataX preguntas={preguntas} handleChange={handleChange} handleSubmit={handleSubmit} errores={errores}/>              
                {data ?
                <PaymentWindow data={data} price={price} subject={subject}/>
                :
                <></>
                }
            </div>
            <Footer/>
            </>
            }
        </div>
    );
};

export default PlanDetail;
