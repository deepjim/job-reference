/*

CSCI 3280, Introduction to Multimedia Systems
Spring 2015

Assignment 01 Skeleton
Name: Chim Wing Tat
Sid: 1155032378
ascii.cpp

*/

#include "stdio.h"
#include "malloc.h"
#include "memory.h"
#include "math.h"
#include "bmp.h"		//	Simple .bmp library

#define MAX_SHADES 8


//
//	***** PUT ALL YOUR CODE INSIDE main() *****
//
int main(int argc, char** argv)
{

	char shades[MAX_SHADES] = { ' ', '.', '+', '*', 'X', '%', '#', '@' };
	int	w, h, i = 0, j = 0, k;
	double gray;
	unsigned char R, G, B;
	//	Read in image data ( command line: argv[1] )
	//
	Bitmap myBmp(argv[1]);

	w = myBmp.getWidth();
	h = myBmp.getHeight();

	//	Prepare output TXT file ( command line: argv[2] )
	//
	FILE *fout = fopen(argv[2], "w");
	fprintf(fout, "%d %d\n", w, h);


	for (i = 0; i < h; i++) {
		for (j = 0; j < w; j++) {
			myBmp.getColor(j, i, R, G, B);
			gray = (0.299*R + 0.587*G + 0.114*B) / 32;
			for (k = 0; k <= MAX_SHADES; k++) {
				if (int(gray) == k) {
					fprintf(fout, "%c", shades[k]);
				}
			}
			if (j == w - 1 && i < h - 1) {
				fprintf(fout, "\n");
			}
		}
	}

	//	close ASCII file
	fclose(fout);

	return 0;

}
