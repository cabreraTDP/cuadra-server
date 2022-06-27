const template = 
`<p style="font-size:9; line-height: 1.15;">
CONTRATO INDIVIDUAL DE TRABAJO POR TIEMPO INDETERMINADO, EN LO SUCESIVO EL <b>“CONTRATO”</b>, EL CUAL ES CELEBRADO POR {{patron}}, A QUIEN SE LE DENOMINARA COMO “EL PATRÓN”, LA CUAL ES REPRESENTADA EN ESTE ACTO POR EL C. {{representante_legal}} Y POR OTRA PARTE EL C. {{nombre_empleado}}, EN LO SUCESIVO “EL TRABAJADOR”, QUIENES EN CONJUNTO SE LES DENOMINARA COMO “LAS PARTES”, AMBAS PARTES SE SUJETAN AL TENOR DE LAS SIGUIENTES DECLARACIONES Y CLÁUSULAS:
</p>

<p style="font-size:9; line-height: 1.15; text-align:center;">
<strong>D E C L A R A C I O N E S</strong>
</p>

<p style="font-size:9; line-height: 1.15;">
<b>I.	EL PATRÓN, declara a través de su Representante Legal:  </b>
<ul style="font-size:9; line-height: 1.15;">
<li style="list-style:none;"><p> a)	Ser una persona moral, con RFC: {{rfc_representante}}, cuenta con domicilio ubicado en {{direccion_representante}}.</p> </li>
<li style="list-style:none;"><p> b)	Tener como principal actividad, {{principal_actividad}}. </p> </li>
<li style="list-style:none;"><p> c)	Que requiere los servicios de <b>movimiento y acomodo estratégico de mercancía, manejo de inventarios, mercadeo, remercadeo, reetiquetato, anaqueleo, estantería, limpieza de anaquel, así como las relacionadas a las mismas,</b> para que desarrolle los deberes y actividades que, en el presente CONTRATO, en forma enunciativa y no limitativa, se establecen. </p> </li>
</ul>
</p>

<p style="font-size:9; line-height: 1.15;">
<b>II.	EL TRABAJADOR, declara por sus propios derechos:</b>
</p>

<ul style="font-size:9; line-height: 1.15;">
<li style="list-style:none;"><p> a)	Llamarse como ha quedado señalado en el proemio de éste <b>CONTRATO</b>, ser de nacionalidad MEXICANA, de sexo {{sexo}}, con fecha de nacimiento del día {{fecha_nacimiento}}, NSS: {{nss}}, CURP: {{curp}} y RFC: {{rfc}} y tener como domicilio el ubicado en {{direccion_empleado}}.</p> </li>
<li style="list-style:none;"><p> b)	Que tiene la capacidad, aptitudes, experiencia y facultades para prestar sus servicios personales a <b>EL PATRÓN</b> respecto del puesto para el que se contrata. </p></li>
<li style="list-style:none;"><p> c)	Que, al momento de celebrar el presente <b>CONTRATO</b>, no padece ninguna enfermedad física ni mental que le impida, o le pueda impedir desarrollar en forma eficiente y constante el trabajo que se le encomienda. </p></li>
</ul>

<p style="font-size:9; line-height: 1.15;">
En base en las anteriores declaraciones, <b>LAS PARTES</b> pactan las siguientes:
</p>

<p style="font-size:9; line-height: 1.15; text-align:center;">
<strong>C L Á U S U L A S</strong>
</p>

<p style="font-size:9; line-height: 1.15;">
<b>CLÁUSULA PRIMERA: <u>OBJETO EL PATRÓN</u></b> contrata a <b>EL TRABAJADOR</b> según lo expuesto en las declaraciones, estando <b>EL TRABAJADOR</b> bajo la dirección y dependencia de <b>EL PATRÓN</b>, y prestando sus servicios personales tales como <b>movimiento y acomodo estratégico de mercancía, manejo de inventarios, mercadeo, remercadeo, reetiquetato, anaqueleo, estantería, limpieza de anaquel, así como las relacionadas a las mismas,</b> las cuales deberá de desempeñar en cualquier área que <b>EL PATRÓN</b> determine, en cualquier domicilio dentro de la República Mexicana, o en cualquier establecimiento que se le indique.
</p>
<p style="font-size:9; line-height: 1.15;">
<b>CLÁUSULA SEGUNDA. <u>TÉRMINO DEL CONTRATO. - EL PATRÓN y EL TRABAJADOR</u></b> convienen que el presente <b>CONTRATO</b> se celebra por tiempo «TIEMPO_CONTRATO», el cual empezara a surtir efectos a partir de la fecha de la firma del mismo. 
</p>
<p style="font-size:9; line-height: 1.15;">
<b>CLÁUSULA TERCERA. <u>RESCISIÓN.</u></b> En caso de que EL TRABAJADOR no tenga la capacidad, aptitudes o facultades que dijo tener para desarrollar los servicios contratados o infrinja en alguna causal según lo estipula el Artículo 47 y sus demás relativos y aplicables de la Ley Federal del Trabajo, El Patrón podrá rescindir su Contrato sin ninguna responsabilidad de su parte, más que las que aún tenga pendientes con EL TRABAJADOR. 
</p>
<p style="font-size:9; line-height: 1.15;">
CLÁUSULA CUARTA. TIEMPO Y ESFUERZO. - EL TRABAJADOR está de acuerdo en dedicar todo su tiempo y esfuerzo a EL PATRÓN y los negocios y asuntos del mismo, y obligándose a cumplir con las responsabilidades y obligaciones requeridas por su puesto, y que expresamente, sin que esto implique limitación alguna, se señalen en este CONTRATO, desempeñando sus funciones, deberes y obligaciones con la debida intensidad, cuidado y esmero, en la forma y términos convenidos en este CONTRATO, sujetándose a las disposiciones de EL PATRÓN , estando sujeto a la supervisión y subordinación de EL PATRÓN en todo lo relativo a la prestación de sus servicios.  
</p>
<p style="font-size:9; line-height: 1.15;">
CLÁUSULA QUINTA. SALARIO BASE. - EL PATRÓN pagará a EL TRABAJADOR como salario diario por sus servicios, la cantidad de {{salario_texto}}, menos las deducciones que resulten aplicables. Las Partes acuerdan que el salario será pagado mediante depósito en cuenta bancaria a nombre de EL TRABAJADOR, así como de cualquier otra prestación en su favor de manera {{esquema_pago}}.
</p>

<p style="font-size:9; line-height: 1.15;">
Manifiesta EL TRABAJADOR que, con la finalidad de tener mayor seguridad en el manejo y administración de sus ingresos, así como de acuerdo a sus necesidades personales, solicita a EL PATRÓN que, de ser posible y a partir del momento que el mismo determine, realice el pago de su salario y demás percepciones que llegase a devengar con motivo de los servicios prestados, depósito en una cuenta bancaria, previamente abierta a su nombre por ella para tal efecto. Asimismo, manifiesta EL PATRÓN que está de acuerdo con la solicitud de EL PATRÓN, Asimismo, se manifiesta que el pago de los días de descanso semanal (séptimos días) y de los días de descanso obligatorio (festivos), se encuentran incluidos dentro del pago del salario {{esquema_pago}}.
</p>

<p style="font-size:9; line-height: 1.15;">
Las partes acuerdan en que a la cantidad arriba mencionada se le harán las deducciones correspondientes a las cuotas que por concepto de cotización de EL TRABAJADOR se deban pagar al Instituto Mexicano del Seguro Social, al Impuesto Sobre la Renta correspondiente, así como cualquier otra aplicable de conformidad con la legislación de la materia, en el entendido de que EL PATRÓN retendrá dichas deducciones a efecto de enterarlas y pagarlas a las autoridades correspondientes de conformidad con la normatividad aplicable. Así mismo, EL PATRÓN deberá realizar todos aquellos pagos que por conducto de prestaciones de vivienda (INFONAVIT) y de seguro para retiro (SAR) sean conducentes.
</p>

<p style="font-size:9; line-height: 1.15;">
CLÁUSULA SEXTA. RECIBOS POR SALARIOS. Al momento de recepción de su salario, EL PATRÓN deberá expedir a EL TRABAJADOR el recibo correspondiente a dicho pago. La expedición de dicho recibo, deberá entenderse, que la aceptación de dicho pago, cubre los servicios prestados por EL TRABAJADOR a EL PATRÓN, estando EL TRABAJADOR inhabilitado para demandar cualquier compensación adicional, en razón de cualquier cantidad que EL TRABAJADOR asume como adeudada deberá en todo caso ser solicitado anterior a la expedición de dicho recibo. La firma contenida en el recibo implica la liberación de EL PATRÓN de toda compensación que por salarios tenga EL TRABAJADOR a la fecha de la firma de dicho recibo, aun y cuando lo anterior no se contenga en el recibo citado.
</p>
<p style="font-size:9; line-height: 1.15;">
CLÁUSULA SÉPTIMA: JORNADA DIARIA DE TRABAJO Y TRABAJO EXTRAORDINARIO. – EL TRABAJADOR prestará sus servicios a EL PATRON en una jornada de un máximo legal de (48) cuarenta y ocho horas a la semana, será discontinua, contando con 01-hora para descansar y/o ingerir sus alimentos, fuera del lugar de trabajo, descansando los domingos y/o podrá ser variable con otro día de la semana en caso de ser necesario. Asimismo, convienen en repartir las horas de trabajo en la forma y términos descritos anteriormente, de conformidad con lo establecido por el Artículo 59, segundo párrafo de la Ley Federal del Trabajo en vigor. EL TRABAJADOR no prestará servicios en tiempo extraordinario, y únicamente laborará en tiempo extraordinario cuando así sea requerido y autorizado por escrito por EL PATRON. Dicha autorización será la única forma de comprobar que laboró durante tiempo extraordinario, así como para el pago del concepto referido.
</p>
<p style="font-size:9; line-height: 1.15;">
CLÁUSULA OCTAVA: FALTAS DE ASISTENCIA. LAS PARTES convienen expresamente que las faltas de asistencia al trabajo derivadas de alguna enfermedad o accidente, solamente podrán ser justificadas por EL TRABAJADOR con las constancias de incapacidad que legalmente expida el Instituto Mexicano del Seguro Social.
</p>
<p style="font-size:9; line-height: 1.15;">
CLÁUSULA NOVENA: DÍAS DE DESCANSO SEMANALES. Por cada 6 (seis) días de trabajo, o su equivalente, EL TRABAJADOR tendrá derecho a un día de descanso, que preferentemente serán los domingos de cada semana., tal y como se conviene en su jornada de labores descrita en la Cláusula Séptima del presente CONTRATO, que dicho descanso lo disfrutará el domingo de cada semana.
</p>
<p style="font-size:9; line-height: 1.15;">
CLÁUSULA DECIMA: DÍAS DE DESCANSO OBLIGATORIOS. - EL TRABAJADOR disfrutará de los días de descanso obligatorios establecidos en el artículo 74 de la Ley Federal del Trabajo en vigor.
</p>
<p style="font-size:9; line-height: 1.15;">
CLÁUSULA DÉCIMA PRIMERA: VACACIONES Y PRIMA VACACIONAL. - EL TRABAJADOR tendrá derecho a un periodo vacacional de conformidad con el artículo 76 de la ley federal de trabajo:                             
</p>
<p style="font-size:9; line-height: 1.15;">
Adicionalmente y en cumplimiento a lo dispuesto por el artículo 80 de la Ley Federal del Trabajo en vigor, EL TRABAJADOR tendrá derecho a recibir el 25% (veinticinco por ciento) de su salario base diario por concepto de prima vacacional, calculado por el número de días hábiles efectivamente tomados como vacaciones.
</p>
<p style="font-size:9; line-height: 1.15;">
CLÁUSULA DÉCIMA SEGUNDA: AGUINALDO. - EL TRABAJADOR tendrá derecho a percibir un Aguinaldo equivalente a quince (15) días de su salario base diario señalado en la Cláusula Quinta de este CONTRATO, que le será cubierto antes del día 20 de diciembre de cada año, de conformidad con el artículo 87 de la Ley Federal del Trabajo en vigor.
</p>
<p style="font-size:9; line-height: 1.15;">
CLÁUSULA DÉCIMA TERCERA. OTROS BENEFICIOS Y PREVISIÓN SOCIAL Y EQUIPO Y MATERIALES DE TRABAJO. EL TRABAJADOR tendrá derecho a participar en todos los planes de previsión social y políticas de beneficios que tenga instaurados EL PATRÓN o que llegue a instaurar en el futuro.
</p>
<p style="font-size:9; line-height: 1.15;">
EL PATRÓN proporcionará a EL TRABAJADOR todos los materiales y equipo necesarios para el desarrollo de los deberes y obligaciones pactados en el presente CONTRATO. EL TRABAJADOR se obliga a cuidar dichos materiales y equipo y a darles un correcto uso.
</p>
<p style="font-size:9; line-height: 1.15;">
CLÁUSULA DECIMA CUARTA. AVISO DE PRIVACIDAD. - LAS PARTES reconocen que con motivo de la celebración de este CONTRATO pueden llegar a intercambiar datos personales, según dicho término se define en la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, como Responsables directos o como Encargados por cuenta de LA EMPLEADA, por lo que en virtud de este acto consienten recíprocamente la obtención, uso, divulgación, almacenamiento, manejo y tratamiento en cualquier forma de dichos datos por LAS PARTES, únicamente para los fines y efectos que se deriven de este CONTRATO.
</p>
<p style="font-size:9; line-height: 1.15;">
CLÁUSULA DECIMA QUINTA. CLÁUSULAS NO PREVISTAS. - En todo lo no previsto en este CONTRATO, las partes se sujetarán a las disposiciones de la Ley Federal del Trabajo 
</p>
<p style="font-size:9; line-height: 1.15;">
CLÁUSULA DECIMA SEXTA. JURISDICCIÓN E INTERPRETACIÓN. Las Partes convienen en sujetarse a la Ley Federal del Trabajo de forma especial en lo que respecta al Teletrabajo en lo establecido en el artículo 311, así como en el Capítulo XII BIS del artículo 330-A al 330-J de la Ley, así como de forma general respecto a las demás disposiciones que le sean aplicables para el cumplimiento e interpretación del presente contrato, el que leído por las partes y enteradas del contenido y alcance legal de todas y cada una de las cláusulas que lo componen, reconocen y aceptan, por lo que el presente contrato se firma por duplicado el día {{fecha_contrato}}, en la ciudad de Monterrey, Nuevo León. 
</p>

<p style="font-size:9; line-height: 1.15;">
POR EL PATRÓN




C. {{representante_legal}}
Representante Legal de
{{patron}}

EL TRABAJADOR




C. {{nombre_empleado}}
Por sus propios derechos	
</p>`


module.exports = {template}