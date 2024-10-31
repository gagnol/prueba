'use server'
import { revalidatePath } from 'next/cache'
import UserModel from './user-model'
import dbConnect from './db-connect'
import { z } from 'zod'
import SliderModel from './slider-model'
import PeriodistaModel from './periodista-model'
import PressModel from './Pressrelease-model'
import ContactModel from './contact-model'

export async function deleteUser(formData: FormData) {
  const schema = z.object({
    _id: z.string().min(1),
    })
  const data = schema.parse({
    _id: formData.get('_id'),
    })
  try {
    await dbConnect()
    await UserModel.findOneAndDelete({ _id: data._id })
    revalidatePath('/')
    return { message: `Deleted user ${data._id}` }
  } catch (e) {
    return { message: 'Failed to delete product' }
  }
}

//delete periodista
export async function deletePeriodista(p0: null, formData: FormData) {
  const schema = z.object({
    _id: z.string().min(1),
  })
  const data = schema.parse({
    _id: formData.get('_id'),
  })
  try {
    await dbConnect()
    await PeriodistaModel.findOneAndDelete({ _id: data._id })
    revalidatePath('/')
    return { message: `Deleted periodista ${data._id}` }
  } catch (e) {
    return { message: 'Failed to delete periodista' }
  }
}
//delete comunicador
export async function deleteComunicador(p0: null, formData: FormData) {
  const schema = z.object({
    _id: z.string().min(1),
  })
  const data = schema.parse({
    _id: formData.get('_id'),
  })
  try {
    await dbConnect()
    await SliderModel.findOneAndDelete({ _id: data._id })
    revalidatePath('/')
    return { message: `Deleted Comunicador ${data._id}` }
  } catch (e) {
    return { message: 'Failed to delete comunicador' }
  }
}
//Borrar Mensaje
export async function deleteMensaje(id: string) {
  const schema = z.string().min(1, "Invalid ID"); // Validate the ID directly
  const _id = schema.parse(id);
  try {
    await dbConnect();
    await ContactModel.findOneAndDelete({ _id });
    revalidatePath("/"); // Revalidate cache if necessary
    return { message: `Comunicado borrado ${_id}` };
  } catch (error) {
    console.error("Error deleting message:", error);
    throw new Error("Failed to delete comunicador");
  }
}

//crear Periodista
export async function createPeriodista(prevState: any, formData: FormData) {
  const schema = z.object({
    name: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
    email: z.string().email({ message: "Debe ser un correo electrónico válido" }),
    topics: z.array(z.string()).nonempty({ message: "Debe seleccionar al menos una temática" }),
    mediaName: z.string().min(1, { message: "El nombre del medio es obligatorio" }),
    mediaType: z.enum(['prensa', 'television', 'radio', 'digital'] ),
    location: z.string().min(1, { message: "La ubicación es obligatoria" }),
    bio: z.string().optional(), // Biografía opcional
  });

  // Parsear los datos del formulario utilizando formData.get para extraer los valores
  const parse = schema.safeParse({
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    topics: formData.getAll('topics') as string[],  // getAll para múltiples valores (array)
    mediaName: formData.get('mediaName') as string,
    mediaType: formData.get('mediaType') as string,
    location: formData.get('location') as string,
    bio: formData.get('bio') as string | undefined, // El campo bio es opcional
  });

  if (!parse.success) {
    console.log(parse.error); // Mostrar errores en la consola
    return { message: 'Form data is not valid', errors: parse.error.errors }; // Retornar un objeto con el mensaje de error y los detalles de validación
  }
    const data = parse.data;
  try {
    // Conectar a la base de datos y crear el registro
    await dbConnect();
    const periodista = new PeriodistaModel(data);
    await periodista.save();

    // Revalidar la ruta (opcional, si es necesario)
    revalidatePath('/');

    // Retornar un mensaje de éxito
    return { message: 'Periodista registrado exitosamente' };
  } catch (e) {
    console.error(e); // Mostrar cualquier error
    return { message: 'Failed to create ' };
  }
}

//crear comunicador
export async function createComunicador(prevState: any, formData: FormData) {
  const schema = z.object({
    name: z.string().min(1, "El nombre debe tener al menos 3 caracteres."),
    email: z.string().email("Correo electrónico no válido."),
    sector: z.enum(['empresarial', 'publico', 'ong', 'asociacion']),
    organization: z.string().min(1, "El nombre de la organización debe tener al menos 3 caracteres."),
    specialization: z.enum(['corporativa', 'crisis', 'digital', 'rse']),
    experience: z.number().min(1, "Debe tener al menos 1 año de experiencia."),
    location: z.string().min(3, "La ubicación debe tener al menos 3 caracteres."),
    bio: z.string().optional(),
  })
  
  const parse = schema.safeParse({
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    sector: formData.get('sector') as string,
    organization: formData.get('organization') as string,
    specialization: formData.get('specialization') as string,
    experience: Number(formData.get('experience')), // Convert to number
    location: formData.get('location') as string,
    bio: formData.get('bio') as string | undefined, // Optional field
  })
  if (!parse.success) {
    console.log(parse.error)
    return { message: 'Form data is not valid' }
  }
  const data = parse.data
  try {
    await dbConnect()
    const product = new SliderModel(data)
    await product.save()
    revalidatePath('/')
    return { message: 'Comunicador registrado exitosamente' }
  } catch (e) {
    return { message: 'Failed to create ' }
  }
}
//crear comunicacion de prensa
export async function nuevaComicacion(p0: null, formData: FormData) {
  const schema = z.object({
    title: z.string().min(1, 'El título es obligatorio'),
    content: z.string().min(1, 'El contenido es obligatorio'),
    mediaType: z.enum(['Prensa', 'Televisión', 'Radio', 'Digital']),
    topic: z.enum(['Política',
      'Economía',
      'Sociedad',
      'Internacionales',
      'Deportes',
      'Espectáculos',
      'Culturales',
      'Eventos']),
    location: z.enum(["Buenos Aires",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán",
  "Ciudad Autónoma de Buenos Aires"]),
    reach: z.enum(['Pequeno', 'Mediano', 'Grande']),
    distributionDate: z.string().transform((str) => new Date(str)).optional(),
    email: z.string().email('Debe ser un correo válido'),
    image: z.string().optional(),
    status: z.enum(['Borrador', 'scheduled', 'Enviado']),
  });

  const parse = schema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    mediaType: formData.get('mediaType'),
    topic: formData.get('topic'),
    location: formData.get('location'),
    reach: formData.get('reach'),
    distributionDate: formData.get('distributionDate') || undefined,
    email: formData.get('email'),
    image: formData.get('image'),
    status: formData.get('status')
  });

  if (!parse.success) {
    console.log(parse.error);
    return { message: 'Form data is not valid', errors: parse.error.errors };
  }

  try {
    await dbConnect();
    const comunicado = new PressModel(parse.data);
    await comunicado.save();
    revalidatePath('/');
    return { message: 'Comunicado enviado exitosamente' };
  } catch (e) {
    console.error(e);
    return { message: 'Failed to create comunicado' };
  }
}


//editar comunicacion
export async function editComicacion(p0: null, formData: FormData) {
  const schema = z.object({
    _id: z.string().min(1, 'El ID es obligatorio'), // Ensure _id is required
    title: z.string().min(1, 'El título es obligatorio'),
    content: z.string().min(1, 'El contenido es obligatorio'),
    mediaType: z.enum(['Prensa', 'Televisión', 'Radio', 'Digital']),
    topic: z.enum(['Política',
      'Economía',
      'Sociedad',
      'Internacionales',
      'Deportes',
      'Espectáculos',
      'Culturales',
      'Eventos'
      ]),
    location: z.enum(["Buenos Aires",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán",
  "Ciudad Autónoma de Buenos Aires"]),
    reach: z.enum(['Pequeno', 'Mediano', 'Grande']),
    distributionDate: z
      .string()
      .transform((str) => (str ? new Date(str) : undefined)) // Handle optional date
      .optional(),
    email: z.string().email('Debe ser un correo válido'),
    image: z.string().optional(),
    status: z.enum(['Borrador', 'scheduled', 'Enviado']),
  });

  // Log formData for debugging
  console.log("Form Data:", Object.fromEntries(formData.entries()));

  // Parse form data
  const parse = schema.safeParse({
    _id: formData.get('_id') as string || '', // Extract the ID from the formData
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    mediaType: formData.get('mediaType') as string,
    topic: formData.get('topic') as string,
    location: formData.get('location') as string,
    reach: formData.get('reach') as string,
    distributionDate: formData.get('distributionDate') || undefined,
    email: formData.get('email') as string,
    image: formData.get('image') as string,
    status: formData.get('status') as string,
  });

  // Check for validation errors
  if (!parse.success) {
    console.log(parse.error);
    return { message: 'Form data is not valid', errors: parse.error.errors };
  }

  const data = parse.data;

  // Ensure _id is not empty after parsing
  if (!data._id) {
    return { message: 'El ID es obligatorio para actualizar el comunicado.' };
  }

  try {
    // Connect to the database
    await dbConnect();
    
    // Update the existing record
    const updatedComunicado = await PressModel.findByIdAndUpdate(data._id, data, { new: true, runValidators: true });

    if (!updatedComunicado) {
      return { message: 'Comunicado no encontrado.' };
    }

    // Optional: Revalidate the path
    revalidatePath('/');

    // Return success message
    return { message: 'Comunicado actualizado exitosamente' };
  } catch (e) {
    console.error(e);
    return { message: 'Failed to update comunicado' };
  }
}

//delete comunicacion usuario
export async function deleteComicacion(p0: null, formData: FormData) {
  const schema = z.object({
    _id: z.string().min(1),
   
  })
  const data = schema.parse({
    _id: formData.get('_id'),
   
  })

  try {
    await dbConnect()
    await PressModel.findOneAndDelete({ _id: data._id })
    revalidatePath('/')
    console.log({ message: `Comunicado borrado ${data._id}` })
    return { message: `Comunicado borrado ${data._id}` }
  } catch (e) {
    return { message: 'Failed to delete product' }
  }
}

//admin graficos

 /*daily  graphics */
 export const comunicadosDiarios = async () => {
  await dbConnect();

  const now = new Date();
  const currentMonth = now.getMonth(); // Mes actual (0 para enero, 11 para diciembre)
  const currentYear = now.getFullYear();

  // Obtener comunicados creados en el mes y año actuales
  const comunicados = await PressModel.find({
    createdAt: {
      $gte: new Date(currentYear, currentMonth, 1), // Primer día del mes
      $lt: new Date(currentYear, currentMonth + 1, 1), // Primer día del siguiente mes
    },
  });

  // Agrupar los comunicados por día del mes
  const comunicadosPerDay = comunicados.reduce((acc: Record<number, number>, comunicado) => {
    const day = new Date(comunicado.createdAt).getDate(); // Día del mes (1-31)
    acc[day] = (acc[day] || 0) + 1; // Incrementa el contador del día
    return acc;
  }, {});

  // Obtener la cantidad total de días en el mes actual
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Generar los datos para el gráfico, asegurando que todos los días estén presentes
  const graphData = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    return { name: `${day}`, comunicados: comunicadosPerDay[day] || 0 };
  });

  // Obtener el nombre del mes en español
  const monthName = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(
    new Date(currentYear, currentMonth)
  );

  return { month: monthName, data: graphData };
};


//*****************  Monthly graphics *****************
export const comunicadosMensuales = async () => {
  await dbConnect();

  const currentYear = new Date().getFullYear();

  // Obtener los comunicados del año actual
  const comunicados = await PressModel.find({
    createdAt: {
      $gte: new Date(`${currentYear}-01-01`), // Primer día del año
      $lt: new Date(`${currentYear + 1}-01-01`), // Primer día del próximo año (exclusivo)
    },
  });

  // Agrupar comunicados por mes
  const comunicadosPerMonth = comunicados.reduce((acc: Record<number, number>, comunicado) => {
    const monthIndex = new Date(comunicado.createdAt).getMonth(); // 0 para enero, 11 para diciembre
    acc[monthIndex] = (acc[monthIndex] || 0) + 1; // Incrementar el contador para el mes correspondiente
    return acc;
  }, {});

  // Generar datos para el gráfico, asegurando que todos los meses estén presentes
  const graphData = Array.from({ length: 12 }, (_, i) => {
    const month = new Intl.DateTimeFormat('es-ES', { month: 'short' }).format(new Date(0, i));
    return { name: month, comunicados: comunicadosPerMonth[i] || 0 };
  });

  return graphData;
};
/* ***********COMUNICADOS POR TEMA********* */
export const comunicadosPorTema = async () => {
  await dbConnect();

  // Obtener la cantidad de comunicados agrupados por topic
  const topicsAggregation = await PressModel.aggregate([
    {
      $group: {
        _id: "$topic", // Agrupar por tema
        count: { $sum: 1 }, // Contar el número de comunicados por tema
      },
    },
    { $sort: { count: -1 } }, // Ordenar por mayor número de comunicados
  ]);

  // Transformar los datos para el frontend
  const graphData = topicsAggregation.map((topic) => ({
    name: topic._id,
    value: topic.count,
  }));

  return graphData;
}; 

//editar avatar
export async function editAvatar(p0: null, formData: FormData) {
  const schema = z.object({
    _id: z.string().min(1, 'El ID es obligatorio'), // Ensure _id is required
    image: z.string().optional(),
  });

  // Log formData for debugging
  console.log("Form Data:", Object.fromEntries(formData.entries()));

  // Parse form data
  const parse = schema.safeParse({
    _id: formData.get('_id') as string || '', // Extract the ID from the formData
     image: formData.get('image') as string,
  });

  // Check for validation errors
  if (!parse.success) {
    console.log(parse.error);
    return { message: 'Form data is not valid', errors: parse.error.errors };
  }

  const data = parse.data;

  // Ensure _id is not empty after parsing
  if (!data._id) {
    return { message: 'El ID es obligatorio para actualizar .' };
  }

  try {
    // Connect to the database
    await dbConnect();
    
    // Update the existing record
    const updatedComunicado = await UserModel.findByIdAndUpdate(data._id, data, { new: true, runValidators: true });

    if (!updatedComunicado) {
      return { message: 'Usuario no encontrado.' };
    }

    // Optional: Revalidate the path
    revalidatePath('/');

    // Return success message
    return { message: 'Usuario actualizado exitosamente' };
  } catch (e) {
    console.error(e);
    return { message: 'Failed to update usuario' };
  }
}
//update periodista
export async function editPeriodista(p0: null, formData: FormData) {
  // Esquema de validación con Zod (opcional)
  const schema = z.object({
    _id: z.string().min(1, "El ID es obligatorio"), // ID es obligatorio
    name: z.string().min(1, "El nombre es obligatorio"),
    email: z.string().email("Debe ser un correo válido"),
    topics: z.array(z.string()).optional(), // Manejar como array de strings
    mediaName: z.string().optional(),
    mediaType: z.enum(["prensa", "television", "radio", "digital"]),
    location: z.enum(["local", "nacional", "internacional"]),
    biography: z.string().optional(),
  });

  // Log de datos para debug
  console.log("Form Data:", Object.fromEntries(formData.entries()));

  // Parsear los datos del formulario
  const parse = schema.safeParse({
    _id: formData.get("_id") as string || "", // Asegurar que _id esté presente
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    topics: (formData.getAll("topics") as string[]) || [], // Array de tópicos
    mediaName: formData.get("mediaName") as string,
    mediaType: formData.get("mediaType") as string,
    location: formData.get("location") as string,
    biography: formData.get("biography") as string,
  });

  // Verificar errores de validación
  if (!parse.success) {
    console.log(parse.error);
    return { message: "Datos del formulario no válidos", errors: parse.error.errors };
  }

  const data = parse.data;

  // Asegurar que _id no esté vacío
  if (!data._id) {
    return { message: "El ID es obligatorio para actualizar el periodista." };
  }

  try {
    // Conectar a la base de datos
    await dbConnect();

    // Actualizar el periodista en la base de datos
    const updatedPeriodista = await PeriodistaModel.findByIdAndUpdate(
      data._id,
      data,
      { new: true, runValidators: true }
    );

    if (!updatedPeriodista) {
      return { message: "Periodista no encontrado." };
    }

    // Revalidar la ruta (opcional)
    revalidatePath("/");

    // Retornar mensaje de éxito
    return { message: "Periodista actualizado exitosamente" };
  } catch (error) {
    console.error(error);
    return { message: "Error al actualizar el periodista" };
  }
}


//delete register
export async function deleteRegister(p0: null, formData: FormData) {
  const schema = z.object({
    _id: z.string().min(1),
   
  })
  const data = schema.parse({
    _id: formData.get('_id'),
   
  })

  try {
    await dbConnect();

    // Check if the document exists in PeriodistaModel
    const periodista = await PeriodistaModel.findById(data._id);
    if (periodista) {
      await PeriodistaModel.findByIdAndDelete(data._id);
      console.log(`Periodista borrado: ${data._id}`);
      return { success: true, message: `Periodista borrado: ${data._id}` };
    }

    // If not found, check in SliderModel
    const comunicador = await SliderModel.findById(data._id);
    if (comunicador) {
      await SliderModel.findByIdAndDelete(data._id);
      console.log(`Comunicador borrado: ${data._id}`);
      return { success: true, message: `Comunicador borrado: ${data._id}` };
    }

    // If not found in either model
    return { success: false, message: "Registro no encontrado." };
  } catch (error) {
    console.error("Error deleting register:", error);
    return { success: false, message: "Error al borrar el registro." };
  }
}
