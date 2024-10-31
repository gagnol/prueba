"use server"
import UserModel from './user-model'
import dbConnect from './db-connect'
import { z } from 'zod'
import bcryptjs from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth'
import PressRelease from './Pressrelease-model';

export async function createUser(prevState: any, formData: FormData) {
    const schema = z.object({
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(6),
        cpassword: z.string().min(6),
    })
    const parse = schema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        cpassword: formData.get('cpassword'),
    })
    if (!parse.success) {
        console.log(parse.error)
        return { message: 'Form data is not valid' }
    }
    const data = parse.data
    try {
        await dbConnect();
        const existingUser = await UserModel.findOne({ email: data.email });
        if (existingUser) {
            return { message: 'User already exist' }
        }
        const hashedPassword = bcryptjs.hash(data.password, 10);

        const newUser = new UserModel({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            avatar: 'https://res.cloudinary.com/dps8xubee/image/upload/v1684105438/avatar/pmbgserj2nobgqn2auwr.png',
            isAdmin: false,
        });
        const user: any = await newUser.save();
        revalidatePath('/')

        return ({
            message: 'User created successfully!',
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } catch (e) {
        return { message: 'Failed to register' }
    }
}

//UPDATE USER

export async function updateUser(prevState: any, formData: FormData) {
    const schema = z.object({
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(6),
        address: z.string().min(6),
        city: z.string().min(2),
        postal: z.string().min(4),
        country: z.string().min(2)
    });

    const parse = schema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        address: formData.get('address'),
        city: formData.get('city'),
        postal: formData.get('postal'),
        country: formData.get('country')
    });

    if (!parse.success) {
        console.log(parse.error);
        return { message: 'Form data is not valid' };
    }

    const data = parse.data;

    try {
        await dbConnect();

        const existingUser = await UserModel.findOne({ email: data.email });

        if (!existingUser) {
            return { message: 'User not found' };
        }

        // Update fields if they are provided in the form data
        if (data.name) {
            existingUser.name = data.name;
        }
        if (data.email) {
            existingUser.email = data.email;
        }

        if (data.password) {
            // Hash the new password before updating
            existingUser.password = await bcryptjs.hash(data.password, 10);
        }
        if (data.address) {
            existingUser.address = data.address;
        }
        if (data.address) {
            existingUser.address = data.address;
        }
        if (data.city) {
            existingUser.city = data.city;
        }
        if (data.postal) {
            existingUser.postal = data.postal;
        }
        if (data.country) {
            existingUser.country = data.country;
        }
        // Save the updated user
        await existingUser.save();
        revalidatePath('/')
        // You can return the updated user or a success message if needed
        return { message: 'Tus datos fueron actualizados', user: JSON.parse(JSON.stringify(existingUser)) };
    } catch (e) {
        console.error(e);
        return { message: 'Failed to update user' };
    }
}

// REVIEWS

export async function updateReview(prevState: any, formData: FormData) {
    const schema = z.object({
        orderId: z.string().min(3),
        name: z.string().min(3),
        email: z.string().min(1),
        avatar: z.string().min(1),
        subject: z.string().min(3),
        review: z.string().min(1),
        rating: z.number().min(1)
    });

    const parse = schema.safeParse({
        orderId: formData.get('orderId'),
        name: formData.get('name'),
        email: formData.get('email'),
        avatar: formData.get('avatar'),
        subject: formData.get('subject'),
        review: formData.get('review'),
        rating: Number(formData.get('rating'))
    });

    if (!parse.success) {
        console.log(parse.error.message);
        return { message: 'Please complete the review' };
    }

    const data = parse.data;

    try {
        // Replace with your actual dbConnect implementation
        await dbConnect();

        const order = await PressRelease.findById({ _id: data.orderId });

        if (!order) {
            return { message: 'Comentario no encontrado' };
        }

        const plainReview = {
            name: data.name,
            email: data.email,
            avatar: data.avatar,
            subject: data.subject,
            review: data.review,
            rating: data.rating
        };
        console.log(plainReview)
        order.reviews.push(plainReview);
        order.numReviews = order.reviews.length;
        order.rating = order.reviews.reduce((a: any, c: { rating: any }) => a + c.rating, 0)
        / order.reviews.length;
        await order.save();

        revalidatePath('/');

        return { message: 'Comentario enviado!', order: JSON.parse(JSON.stringify(order)) };
    } catch (e) {
        console.error(e);
        return { message: 'Failed to review' };
    }
}

export async function submitLike(prevState: any, formData: FormData) {
    const schema = z.object({
      _id: z.string().min(3),
    });
  
    const parse = schema.safeParse({
      _id: formData.get('_id'),
    });
  
    if (!parse.success) {
      console.log(parse.error);
      return { message: 'Form data is not valid' };
    }
  
    const data = parse.data;
  
    try {
      const session = await getServerSession();
      if (!session?.user?.email) {
        return { message: 'Usuario no autenticado' };
      }
  
      await dbConnect();
      const pressRelease = await PressRelease.findById(data._id);
  
      if (!pressRelease) {
        return { message: 'Press release no encontrado' };
      }
  
      // Verificar si el usuario ya dio like
      const existingLike = pressRelease.likes.find(
        (like:any) => like.user === session?.user?.email
      );
  
      if (existingLike) {
        // Eliminar el like existente
        pressRelease.likes = pressRelease.likes.filter(
          (like:any) => like.user !== session?.user?.email
        );
      } else {
        // Agregar un nuevo like
        pressRelease.likes.push({ user: session.user.email });
      }
  
      await pressRelease.save();
      revalidatePath('/');
  
      return {
        message: existingLike ? 'Voto eliminado' : 'Gracias por tu voto',
        user: JSON.parse(JSON.stringify(pressRelease)),
      };
    } catch (error) {
      console.error(error);
      return { message: 'Error al procesar el voto' };
    }
  }
  /*daily  graphics */
  export const comunicadosDiarios = async () => {
    const session = await getServerSession(); // Obtener la sesión del usuario
    if (!session?.user?.email) return { month: '', data: [] }; // Verificación de la sesión
  
    await dbConnect();
  
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
  
    // Obtener comunicados del usuario en el mes y año actuales
    const comunicados = await PressRelease.find({
      createdAt: {
        $gte: new Date(currentYear, currentMonth, 1),
        $lt: new Date(currentYear, currentMonth + 1, 1),
      },
      email: session.user.email, // Filtrar por email del usuario autenticado
    });
  
    const comunicadosPerDay = comunicados.reduce((acc: Record<number, number>, comunicado) => {
      const day = new Date(comunicado.createdAt).getDate();
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {});
  
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
    const graphData = Array.from({ length: daysInMonth }, (_, i) => ({
      name: `${i + 1}`,
      comunicados: comunicadosPerDay[i + 1] || 0,
    }));
  
    const monthName = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(
      new Date(currentYear, currentMonth)
    );
  
    return { month: monthName, data: graphData };
  };
  
  //*****************  Monthly graphics *****************
  export const comunicadosMensuales = async () => {
    const session = await getServerSession(); // Obtener la sesión del usuario
    if (!session?.user?.email) return []; // Verificación de la sesión
  
    await dbConnect();
  
    const currentYear = new Date().getFullYear();
  
    // Obtener comunicados del usuario en el año actual
    const comunicados = await PressRelease.find({
      createdAt: {
        $gte: new Date(`${currentYear}-01-01`),
        $lt: new Date(`${currentYear + 1}-01-01`),
      },
      email: session.user.email, // Filtrar por email del usuario autenticado
    });
  
    const comunicadosPerMonth = comunicados.reduce((acc: Record<number, number>, comunicado) => {
      const monthIndex = new Date(comunicado.createdAt).getMonth();
      acc[monthIndex] = (acc[monthIndex] || 0) + 1;
      return acc;
    }, {});
  
    const graphData = Array.from({ length: 12 }, (_, i) => {
      const month = new Intl.DateTimeFormat('es-ES', { month: 'short' }).format(new Date(0, i));
      return { name: month, comunicados: comunicadosPerMonth[i] || 0 };
    });
  
    return graphData;
  };
  /* ***********COMUNICADOS POR TEMA********* */
  export const comunicadosPorTema = async () => {
    const session = await getServerSession(); // Obtener la sesión del usuario
    if (!session?.user?.email) return []; // Verificación de la sesión
  
    await dbConnect();
  
    // Obtener temas de comunicados específicos del usuario
    const topicsAggregation = await PressRelease.aggregate([
      { $match: { email: session.user.email } }, // Filtrar por email del usuario autenticado
      {
        $group: {
          _id: '$topic', // Agrupar por tema
          count: { $sum: 1 }, // Contar el número de comunicados por tema
        },
      },
      { $sort: { count: -1 } }, // Ordenar por mayor número de comunicados
    ]);
  
    const graphData = topicsAggregation.map((topic) => ({
      name: topic._id,
      value: topic.count,
    }));
  
    return graphData;
  };
  
  