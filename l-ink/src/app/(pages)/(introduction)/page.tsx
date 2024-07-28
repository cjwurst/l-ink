import LSystem from '@/app/ui/lSystem';
import urlParamsToProps from '@/app/lib/urlParamReader';
import { URLSearchParams } from 'url';

export default function Home() {
    return <></>;
    // return (
    //     <div className="m-64 mt-32 mb-32">
    //         <div className="text-xl font-extrabold mb-16">L-Systems: Exploring Self-Similarity</div>
    //         <div className="mb-8">
    //             When we are first introduced to the concept of symmetry, we are exposed to only a few varieties: rotational, reflective, and translational symmetry.
    //             What do these properties have in common? Rotationally symmetric shapes remain unchanged
    //             when we spin them around an axis at a certain increment. [More examples] In general, these shapes remain unchanged after we transform them in some way. 
    //             Then there are as many kinds of symmetry as there are ways to transform a shape.
    //         </div>
    //         <div className="mb-8">
    //             In this article we'll look at a particular kind of symmetry called "self-similarity." In the strictest sense, a shape is called "self-similar" if one part of it is 
    //             identical to the whole - the shape remains unchanged when we zoom in to a particular part of the shape. For example, [figure] displays the edge of a self-similary shape called the Koch snowflake. 
    //             Use [some mechanism for zooming in] to get a closer look.  
    //         </div>
    //         <div>
    //             <div className="float-left w-[300px] h-[300px] m-8">
    //                 <LSystem 
    //                     {...urlParamsToProps(new URLSearchParams("count=8&alphabet=a-%2B&axiom=a&iterate=%7C*a%7Ca-a%2B%2Ba-a*-%7C-*%2B%7C%2B&draw=%7Ca*-%7Cb*%2B%7Cc&angle=0&increment=60&origin=-3280.500000000175%7C-1893.99755807656%7C0&distance=1"))}
    //                     fitCameraToMesh={false}
    //                     enableControls={false}
    //                     enableZoom
    //                     zoomLoop={[1, 3]}
    //                 />
    //             </div>
    //         </div>
    //         <div className="mb-8">
    //             The Koch snowflake could be said to have unlimited depth - notice that as you zoom in and out, no detail
    //             is lost. This visualization is only made possible by some computer-generated trickery that adds and removes detail as you zoom in and out. Real-world examples 
    //             of self-similarity are necessarily limited in detail. Below is a line model of a fern frond. You can zoom into this shape for a while, but each time it matches 
    //             up with the original image, it loses some detail. At the smallest level, we're left with a single line segment. Yet in some ways, this example is similar to 
    //             the Koch snowflake. Detail is lost as we magnify the figure, but the general shape of the frond is preserved as we zoom in. If we allow this looser definition of 
    //             self-similarity, we might notice many examples in nature, especially among plant life. 
    //             [Some figures with description]
    //         </div>
    //         <div className="mb-8">
    //             Hungarian botanist Aristid Lindenmayer developed a mathematical model for this type of self-similarity. These
    //             "Lindenmayer systems" or "L-systems" can model massively complex self-similar structures just by following a simple set of rules to manipulate
    //             strings of characters. Before we dive into more expressive systems, let's learn how these rules work by looking at a simple example. 
    //             [Algae example]
    //         </div>
    //         <div className="mb-8">
    //             Next, let's look at how we can turn these strings of characters into physical shapes. First, assign a "draw rule" to each character. As we read through the string, 
    //             follow the rule of each character in that order. For example, at each "A" we might draw a line segment. At each "B" we might turn left by a fixed amount. 
    //             You can experiment with this system by changing the draw rules of each character. Notice that each iteration of our simple L-system gets a little more complex, 
    //             just like the structure of our self-similar fern example as we zoom out.
    //         </div>
    //         <div>

    //         </div>
    //     </div>
    // );
}
