import Link from "next/link";

export default function Acercade() {
    return (
        <section className="como-participar">
            <h2 className="has-text-pink is-size-2">¿Cómo participar?</h2>
            <div className="static-info-wrapper-content">
                <h1 className="has-text-primary is-size-4 mt-6 mb-3">
                    ¿Cómo funciona?
                </h1>
                <div>
                    <p>
                        El Pacto Interciudad es un instrumento de incidencia
                        pública construido de forma colaborativa, donde personas
                        y ciudades definen una visión estratégica para afrontar
                        la crisis climática desde América Latina para el mundo.
                    </p>
                    <span className="is-italic pt-text">
                        *O Pacto-Intercidades é um instrumento de incidência
                        pública construído de forma colaborativa, no qual
                        pessoas e cidades definem uma visão estratégica para
                        enfrentar a crise climática da América Latina para o
                        mundo.
                    </span>
                    <ol type="a">
                        <li>
                            Cada Asamblea Climática elabora al menos 4
                            propuestas de principios para el Pacto .
                            <span className="is-italic is-block m-0 pt-text" >
                            * Cada Assembleia Climática 
                            decide por pelo menos 4 propostas de princípios para
                            o pacto.
                            </span>
                        </li>
                        <li>
                            Las propuestas se publican en la plataforma del
                            Pacto Interciudad para recibir contribuciones,
                            aportes y comentarios de la ciudadanía en general.
                            <span className="is-italic is-block m-0 pt-text" >
                            * As propostas são publicadas na plataforma do
                            Pacto-Intercidades para receber contribuições,
                            sugestões e comentários da população em geral.
                            </span>
                        </li>
                        <li>
                            Para participar del debate y determinación del Pacto
                            las personas deben registrarse con nombre y ciudad
                            <Link href="/auth/login">aquí</Link>.
                            <span className="is-italic is-block m-0 pt-text" >
                            * Para participar do debate e determinação do Pacto,
                            as pessoas devem se registrar com nome e cidade <Link href="/auth/login">aquí</Link>.
                            </span>
                        </li>
                        <li>
                            Durante el proceso de participación se generarán
                            versiones actualizadas y mejoradas del Pacto con los
                            aportes de las personas registradas.
                            <span className="is-italic is-block m-0 pt-text" >
                            * Ao longo do processo de participação são geradas
                            versões atualizadas e aprimoradas do Pacto, graças
                            às contribuições das pessoas.
                            </span>
                        </li>
                        <li>
                            Finalmente se redactará un documento final del Pacto
                            Interciudad que se pondrá a consideración de las
                            personas para su validación final.
                            <span className="is-italic is-block m-0 pt-text" >
                            * Finalmente um documento final do Pacto-Intercidades
                            é gerado e será apresentado para consideração das
                            pessoas para sua validação final.
                            </span>
                        </li>
                    </ol>
                </div>
                <h3 className="has-text-primary has-text-weight-bold is-size-4 mt-6 mb-3">
                    ¿Cómo participar en el Pacto?
                    <span className="is-italic is-size-5 has-text-weight-light is-block mb-2 mt-1">
                        *Como participar do Pacto?
                    </span>
                </h3>
                <div>
                    <h5 className="is-size-5 has-text-weight-bold mt-4 has-text-primary">
                        Registro e inicio de sesión
                        <p className="is-italic is-size-6">
                            Cadastro e Início de Sessão
                        </p>
                    </h5>
                    <p>
                        Para participar es necesario crear una cuenta en la
                        plataforma. El botón LOGIN te dirigirá al formulario de
                        registro donde deberás completar los campos requeridos.
                        <br />
                        Luego de crear tu cuenta es necesario que accedas a tu
                        correo para validar el registro. En caso de no
                        encontrarlo, revisa las carpetas de spam y correo no
                        deseado.
                    </p>
                    <span className="is-italic pt-text">
                        *Para acessar a plataforma, é necessário criar uma conta.
                        O botão LOGIN irá direcioná-lo ao formulário de
                        cadastro, onde você deverá preencher os campos
                        necessários.
                        <br />
                        Após criar a sua conta, é necessário acessar seu e-mail
                        para validar o registro. Caso não encontre, verifique a
                        sua caixa de spam.
                    </span>
                    <h5 className="is-size-5 has-text-weight-bold mt-4 has-text-primary">
                        Acceso al Pacto
                        <p className="is-italic is-size-6">Acesso ao Pacto</p>
                    </h5>
                    <p>
                        Puedes acceder al pacto haciendo click en la pestaña
                        “Pacto” del menú superior o desde el resumen del pacto
                        en el inicio.
                        <br />
                        Esta sección cuenta con tres pestañas: Resumen, Pacto y
                        Hoja de ruta. Todas las acciones de participación se
                        concentran en la pestaña Pacto.
                    </p>
                    <span className="is-italic pt-text">
                        *Você pode acessar o pacto clicando na aba &quot;Pacto&quot; no
                        menu superior ou a partir do resumo do pacto no início.
                        <br />
                        Esta seção possui três abas: Resumo, Pacto e Roteiro.
                        Todas as ações de participação estão concentradas na aba
                        Pacto.
                    </span>
                    <h5 className="is-size-5 has-text-weight-bold mt-4 has-text-primary">
                        Aportes
                        <p className="is-italic is-size-6">Contribuições</p>
                    </h5>
                    <p>
                        En cada máxima podrás valorar con un Me gusta/No me
                        gusta y realizar aportes o sugerencias al texto. Además,
                        se pueden responder y valorar los aportes realizados por
                        otros usuarios. Todos los comentarios recibidos en las
                        máximas serán tenidos en cuenta y, de considerarse
                        relevantes, podrían modificar el texto de la máxima en
                        una nueva versión del pacto.
                    </p>
                    <span className="is-italic pt-text">
                        *Em cada resolução, você pode avaliar com um
                        Curtir/Descurtir e fazer contribuições ou sugestões ao
                        texto. Além disso, é possível responder e avaliar as
                        contribuições feitas por outros usuários. Todos os
                        comentários recebidos nas resoluções serão considerados
                        e, caso sejam relevantes, poderão modificar o texto em
                        uma nova versão do pacto.
                    </span>
                    <h5 className="is-size-5 has-text-weight-bold mt-4 has-text-primary">
                        Comentarios
                        <p className="is-italic is-size-6">Comentários</p>
                    </h5>
                    <p>
                        Debajo del pacto encontrarás la sección de comentarios
                        generales, donde podrás ver, responder y valorar los
                        comentarios de otros usuarios como también dejar tus
                        propios comentarios sobre el contenido.
                    </p>
                    <span className="is-italic pt-text">
                        *Abaixo do pacto, você encontrará a seção de comentários
                        gerais, onde é possível ver, responder e avaliar os
                        comentários de outros usuários, assim como deixar seus
                        próprios comentários sobre o conteúdo.
                    </span>
                    <h5 className="is-size-5 has-text-weight-bold mt-4 has-text-primary">
                        Encuestas
                        <p className="is-italic is-size-6">Enquetes</p>
                    </h5>
                    <p>
                        Según las necesidades y requerimientos del equipo de
                        (Re)surgentes, se publicarán preguntas relámpago en la
                        plataforma con el objetivo de recabar información
                        relevante para el proyecto. Al ingresar verás en la
                        pantalla una ventana emergente con la/s preguntas en
                        cuestión, que podrán contestar fácilmente.
                    </p>
                    <span className="is-italic pt-text">
                        *Conforme as necessidades e requisitos da equipe de
                        (Re)surgentes, serão publicadas “perguntas-relâmpago” na
                        plataforma, com o objetivo de coletar informações
                        relevantes para o projeto. Ao entrar, você verá na tela
                        uma janela pop-up com as perguntas a serem respondidas.
                    </span>
                </div>
            </div>
        </section>
    );
}
